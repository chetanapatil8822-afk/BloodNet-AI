import { useState } from "react";
import { addDonor } from "../../services/donorService";
import { useNavigate } from "react-router-dom";

function RegisterDonor() {
  const navigate = useNavigate();

  // ✅ All Indian States
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

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    state: "",
    district: "",
    city: "",
    phone: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDonor(formData);

      alert("Donor Registered Successfully ✅");

      navigate("/find-donor");

      setFormData({
        name: "",
        bloodGroup: "",
        state: "",
        district: "",
        city: "",
        phone: "",
        availability: true,
      });

    } catch (error) {
      console.error("Error adding donor:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register as Donor
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        {/* Blood Group */}
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group (e.g. O+)"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        {/* ✅ State Dropdown */}
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        >
          <option value="">Select State</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* ✅ District Input (no dropdown) */}
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
          required
        />

        {/* Availability */}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="mr-2"
          />
          Available for donation
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primaryDark"
        >
          Register
        </button>
      </form>

    </div>
  );
}

export default RegisterDonor;