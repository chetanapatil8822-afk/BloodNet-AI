import { useState } from "react";
import { addDonor } from "../../services/donorService";
import { useNavigate } from "react-router-dom";

function RegisterDonor() {
  const navigate = useNavigate();

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
    } catch (error) {
      console.error("Error adding donor:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4 py-12">
      
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
        
        {/* Red Accent Top Bar */}
        <div className="h-2 bg-red-600 w-full"></div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          
          {/* Header */}
          <div className="mb-15 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Become a <span className="text-red-600">Hero</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Join the BloodNet network and help save lives in your city.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* --- Section 1: Personal Details --- */}
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 border-b pb-2">
                Personal Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
                  required
                />

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium transition-all"
                  required
                >
                  <option value="">Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="WhatsApp or Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
                required
              />
            </div>

            {/* --- Section 2: Location Details --- */}
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 border-b pb-2">
                Location Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium transition-all"
                  required
                >
                  <option value="">Select State</option>
                  {statesOfIndia.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>

                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
                  required
                />
              </div>

              <input
                type="text"
                name="city"
                placeholder="City / Locality"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
                required
              />
            </div>

            {/* Availability Toggle */}
            <div className="bg-red-50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-red-800">Availability Status</p>
                <p className="text-[11px] text-red-600">You can change this anytime from your dashboard.</p>
              </div>
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="w-6 h-6 accent-red-600 rounded-lg cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-[1.5rem] shadow-xl shadow-red-100 transition-all active:scale-[0.97] flex items-center justify-center gap-3 text-lg"
            >
              Complete Registration
            </button>
          </div>
        </form>

        <div className="pb-8 text-center">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                Secure Registration • BloodNet AI
            </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterDonor;