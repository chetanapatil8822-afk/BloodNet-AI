import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmergencyRequest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bloodGroup: "",
    city: "",
    urgency: "Normal",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/find-donor", {
      state: form,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      {/* 🔥 Main Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          🚨 Emergency Blood Request
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Fill details to quickly find nearby donors
        </p>

        {form.urgency === "Urgent" && (
  <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center font-medium mb-4">
    🚨 This is an urgent request. Nearby donors will be prioritized.
  </div>
)}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Blood Group */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
          </div>

          {/* City */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Urgency */}
          <div>
  <label className="block mb-2 font-medium text-gray-700">
    Urgency Level
  </label>

  <div className="flex gap-4">
    
    {/* Normal */}
    <button
      type="button"
      onClick={() => setForm({ ...form, urgency: "Normal" })}
      className={`flex-1 p-3 rounded-lg border text-center font-medium transition 
        ${
          form.urgency === "Normal"
            ? "bg-gray-200 border-gray-400"
            : "bg-white hover:bg-gray-100"
        }`}
    >
      Normal
    </button>

    {/* Urgent */}
    <button
      type="button"
      onClick={() => setForm({ ...form, urgency: "Urgent" })}
      className={`flex-1 p-3 rounded-lg border text-center font-medium transition 
        ${
          form.urgency === "Urgent"
            ? "bg-red-500 text-white border-red-600 shadow-md"
            : "bg-white hover:bg-red-100"
        }`}
    >
      🚨 Urgent
    </button>

  </div>
</div>
          {/* Message */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Additional Message (Optional)
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="3"
              placeholder="Add any extra details..."
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            🔍 Find Matching Donors
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmergencyRequest;