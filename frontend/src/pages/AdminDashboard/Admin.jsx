import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  // Fetch donors
  const fetchDonors = async () => {
    const res = await axios.get("http://localhost:5000/donors");
    setDonors(res.data);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Delete donor
  const deleteDonor = async (id) => {
    await axios.delete(`http://localhost:5000/donors/${id}`);
    fetchDonors();
  };

  // Toggle availability
  const toggleAvailability = async (donor) => {
    await axios.put(`http://localhost:5000/donors/${donor._id}`, {
      availability: !donor.availability,
    });
    fetchDonors();
  };

  const markAsDonated = async (id) => {
  await axios.put(`http://localhost:5000/donors/${id}`, {
    availability: false,
    lastDonationDate: new Date(),
  });
  fetchDonors();
};

  // 🔥 STEP 3: FILTER LOGIC
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

      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded-lg w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔥 Dropdown Blood Group */}
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

        {/* City */}
        <input
          type="text"
          placeholder="City"
          className="border p-2 rounded-lg w-full"
          onChange={(e) => setCity(e.target.value)}
        />

      </div>

      {/* 🔥 STEP 4: USE FILTERED DATA */}
      <div className="grid gap-6">
        {filteredDonors.map((donor) => (
          <div
            key={donor._id}
            className="p-5 bg-white shadow-md rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">{donor.name}</h2>
              <p>{donor.bloodGroup} | {donor.city}</p>
              <p className="text-sm">
                Status:{" "}
                <span className={donor.availability ? "text-green-600" : "text-red-500"}>
                  {donor.availability ? "Available" : "Not Available"}
                </span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;