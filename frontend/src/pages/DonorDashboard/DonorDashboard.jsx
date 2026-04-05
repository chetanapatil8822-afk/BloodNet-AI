import { useEffect, useState } from "react";
import axios from "axios";

function DonorDashboard() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDonors = async () => {
    const res = await axios.get("http://localhost:5000/donors");
    setDonors(res.data);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // 🔁 Toggle Availability
  const toggleAvailability = async (donor) => {
    try {
      await axios.put(`http://localhost:5000/donors/${donor._id}`, {
        availability: !donor.availability,
      });
      fetchDonors();
    } catch (err) {
      console.error("Error updating availability:", err);
    }
  };

  // 🟢 Mark as Donated
  const markAsDonated = async (id) => {
    try {
      await axios.put(`http://localhost:5000/donors/${id}`, {
        availability: false,
        lastDonationDate: new Date(),
      });
      fetchDonors();
    } catch (err) {
      console.error("Error marking donation:", err);
    }
  };

  // 🔍 Filter
  const filteredDonors = donors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.phone?.includes(search)
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name or phone..."
        className="border p-2 rounded-lg w-full mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-6">
        {filteredDonors.map((donor) => (
          <div
            key={donor._id}
            className="p-5 bg-white shadow-md rounded-xl"
          >
            <h2 className="font-bold text-lg">{donor.name}</h2>

            <p>{donor.bloodGroup} | {donor.city}</p>

            {/* 🟢 Availability Status */}
            <p className="mt-2">
              Status:{" "}
              <span
                className={
                  donor.availability ? "text-green-600" : "text-red-500"
                }
              >
                {donor.availability ? "Available" : "Not Available"}
              </span>
            </p>

            {/* 🎯 Buttons */}
            <div className="mt-4 flex gap-3">

              <button
                onClick={() => toggleAvailability(donor)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Toggle Availability
              </button>

              <button
                onClick={() => markAsDonated(donor._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                I Donated Today
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default DonorDashboard;