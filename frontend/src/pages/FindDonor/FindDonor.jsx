import { useState, useEffect } from "react";
import axios from "axios";
import DonorCard from "../../components/DonorCard/DonorCard";

function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/donors");
        setDonors(res.data);
      } catch (err) {
        console.error("Error fetching donors:", err);
      }
    };

    fetchDonors();
  }, []);

  // 🔥 UPDATED FILTER (with 90-day + availability logic)
const filteredDonors = donors.filter((d) => {
  const today = new Date();

  // 🔍 Search filters
  const matchesSearch = d.bloodGroup?.toLowerCase().includes(search.toLowerCase());
  const matchesCity = d.city?.toLowerCase().includes(city.toLowerCase());

  // ❌ If donor manually marked unavailable → hide
  if (!d.availability) return false;

  // 🧠 Auto eligibility logic for lastDonationDate
  if (!d.lastDonationDate) {
    return matchesSearch && matchesCity;
  }

  const last = new Date(d.lastDonationDate);
  const diffDays = (today - last) / (1000 * 60 * 60 * 24);

  // ✅ Only show if 90+ days since last donation
  return matchesSearch && matchesCity && diffDays > 90;
});

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Blood Donors
      </h1>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search Blood Group (e.g. O+)"
          className="border p-3 rounded-lg w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter City"
          className="border p-3 rounded-lg w-full md:w-1/3"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <p className="text-center mb-4 text-gray-600">
        Showing {filteredDonors.length} donors
      </p>

      {/* Donor List */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No donors found
          </p>
        )}
      </div>
    </div>
  );
}

export default FindDonor;