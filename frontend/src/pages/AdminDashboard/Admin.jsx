import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  // Fetch donors
  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donors");
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Delete donor
  const deleteDonor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/donors/${id}`);
      fetchDonors();
    } catch (err) {
      console.error("Error deleting donor:", err);
    }
  };

  // Toggle availability
  const toggleAvailability = async (donor) => {
    try {
      await axios.put(`http://localhost:5000/donors/${donor._id}`, {
        availability: !donor.availability,
      });
      fetchDonors();
    } catch (err) {
      console.error("Error toggling availability:", err);
    }
  };

  // Mark as Donated
  const markAsDonated = async (id) => {
    try {
      await axios.put(`http://localhost:5000/donors/${id}`, {
        availability: false,
        lastDonationDate: new Date(),
      });
      fetchDonors();
    } catch (err) {
      console.error("Error marking as donated:", err);
    }
  };

  // 🔥 FILTER LOGIC (Admin panel shows all donors)
  const filteredDonors = donors.filter((d) => {
    return (
      d.name?.toLowerCase().includes(search.toLowerCase()) &&
      d.bloodGroup?.toLowerCase().includes(bloodGroup.toLowerCase()) &&
      d.city?.toLowerCase().includes(city.toLowerCase())
    );
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded-lg w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg w-full"
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          placeholder="City"
          className="border p-2 rounded-lg w-full"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Donor List */}
      <div className="grid gap-6">
        {filteredDonors.map((donor) => {
          const today = new Date();
          let statusText = donor.availability ? "Available" : "Not Available";
          let statusColor = donor.availability ? "text-green-600" : "text-red-500";

          // Optional: show "Eligible in X days" if donated recently
          if (!donor.availability && donor.lastDonationDate) {
            const last = new Date(donor.lastDonationDate);
            const diffDays = (today - last) / (1000 * 60 * 60 * 24);
            if (diffDays <= 90) {
              statusText = `Eligible in ${Math.ceil(90 - diffDays)} days`;
              statusColor = "text-yellow-600";
            } else {
              statusText = "Available";
              statusColor = "text-green-600";
            }
          }

          return (
            <div
              key={donor._id}
              className="p-5 bg-white shadow-md rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{donor.name}</h2>
                <p>{donor.bloodGroup} | {donor.city}</p>
                <p className={`text-sm font-semibold ${statusColor}`}>
                  {statusText}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleAvailability(donor)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Toggle
                </button>

                <button
                  onClick={() => deleteDonor(donor._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>

                <button
                  onClick={() => markAsDonated(donor._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Donated
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;