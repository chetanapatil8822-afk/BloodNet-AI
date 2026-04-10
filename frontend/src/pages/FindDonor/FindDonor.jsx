import { useState, useEffect } from "react";
import axios from "axios";
import DonorCard from "../../components/DonorCard/DonorCard";
import { useLocation } from "react-router-dom"; // ✅ ADDED


function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const location = useLocation(); // ✅ ADDED
  const emergencyData = location.state || null; // ✅ FIXED (SAFE HANDLING)

  // ✅ Same states list
  const statesOfIndia = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
    "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
    "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal",
    "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
    "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];

  // 🔥 UPDATED: Fetch donors (Emergency + Normal mode)
  useEffect(() => {
  const fetchDonors = async () => {
    try {
      let res;

      if (emergencyData?.bloodGroup && emergencyData?.city) {
        // 🧠 ML MODE
        res = await axios.post(
          "http://localhost:5000/match-donors",
          emergencyData
        );
      } else {
        // 🧠 NORMAL MODE
        res = await axios.get("http://localhost:5000/donors");
      }

      console.log("API RESPONSE:", res.data); // 🔥 DEBUG
      setDonors(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchDonors();
}, [emergencyData]);

  // 🔥 Auto-fill emergency filters (UNCHANGED LOGIC)
  useEffect(() => {
    if (emergencyData) {
      if (emergencyData.bloodGroup) {
        setSearch(emergencyData.bloodGroup);
      }
      if (emergencyData.city) {
        setCity(emergencyData.city);
      }
    }
  }, [emergencyData]);

  // 🔥 FILTER LOGIC (UNCHANGED)
  const filteredDonors = donors;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Blood Donors
      </h1>

      {/* 🔍 Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center flex-wrap">

        {/* Blood Group */}
        <select
          className="border p-3 rounded-lg w-full md:w-1/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        {/* City */}
        <input
          type="text"
          placeholder="Enter City"
          className="border p-3 rounded-lg w-full md:w-1/4"
          value={city}
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