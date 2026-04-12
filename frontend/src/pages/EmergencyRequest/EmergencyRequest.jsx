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
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4 font-sans">

      {/* 🔥 Main Card - Matching the rest of the project */}
      <div className="bg-white border-2 border-slate-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] rounded-[2.5rem] p-10 w-full max-w-2xl overflow-hidden relative">
        
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 h-2 bg-red-600 w-full"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            🚨 Emergency <span className="text-red-600">Blood Request</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
            Fill details to quickly find nearby donors
          </p>
        </div>

        {form.urgency === "Urgent" && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-center font-black text-sm mb-6 border border-red-100 animate-pulse">
            🚨 This is an urgent request. Nearby donors will be prioritized.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Blood Group */}
          <div>
            <label className="block mb-2 text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Required Blood Group
            </label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border-2 border-transparent focus:border-red-100 p-4 rounded-2xl outline-none text-slate-700 font-medium cursor-pointer transition-all"
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
            <label className="block mb-2 text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
              City / Location
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Mumbai, Delhi"
              required
              className="w-full bg-slate-50 border-2 border-transparent focus:border-red-100 p-4 rounded-2xl outline-none text-slate-700 font-medium cursor-pointer transition-all"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block mb-2 text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Urgency Level
            </label>

            <div className="flex gap-4">
              {/* Normal */}
              <button
                type="button"
                onClick={() => setForm({ ...form, urgency: "Normal" })}
                className={`flex-1 p-4 rounded-2xl border-2 text-center font-black uppercase tracking-widest text-xs transition-all 
                  ${
                    form.urgency === "Normal"
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
              >
                Normal
              </button>

              {/* Urgent */}
              <button
                type="button"
                onClick={() => setForm({ ...form, urgency: "Urgent" })}
                className={`flex-1 p-4 rounded-2xl border-2 text-center font-black uppercase tracking-widest text-xs transition-all 
                  ${
                    form.urgency === "Urgent"
                      ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-100"
                      : "bg-white border-slate-100 text-red-400 hover:border-red-50"
                  }`}
              >
                🚨 Urgent
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Additional Note (Optional)
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="3"
              placeholder="Hospital name or specific unit details..."
              className="w-full bg-slate-50 border-2 border-transparent focus:border-red-100 p-4 rounded-2xl outline-none text-slate-800 font-black placeholder:text-slate-400 resize-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-[1.5rem] shadow-xl shadow-red-100 transition-all active:scale-[0.97] text-lg uppercase tracking-wider"
          >
            🔍 Find Matching Donors
          </button>
        </form>

        {/* Branding Footer */}
        <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
                Secure Request • BloodNet Priority
            </p>
        </div>
      </div>
    </div>
  );
}

export default EmergencyRequest;