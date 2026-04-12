import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!data.name || !data.email || !data.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", data);
      alert("Signup successful 🎉");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4 py-10 font-sans">
      
      {/* 📝 Registration Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] rounded-[2.5rem] overflow-hidden">
        
        {/* Top Branding Accent - Dominant Red */}
        <div className="h-2 bg-red-600 w-full"></div>

        <div className="p-10 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🤝</div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Create <span className="text-red-600">Account</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Join the community and start saving lives today.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Set Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Signup Button - Dominant Red */}
            <button
              onClick={handleSignup}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-[1.5rem] shadow-xl shadow-red-100 transition-all active:scale-[0.97] mt-4 text-lg"
            >
              Register Now
            </button>
          </div>

          {/* Bottom Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-red-600 font-bold hover:underline underline-offset-4 transition-all"
              >
                Login
              </button>
            </p>
          </div>
        </div>

        {/* Security Tagline */}
        <div className="pb-8 text-center border-t border-gray-50 pt-6">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            Encrypted Registration • BloodNet AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;