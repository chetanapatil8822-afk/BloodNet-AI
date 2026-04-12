import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    } else if (role) {
      navigate("/donor-dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", data);

      // ✅ Save user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      // 🎯 Role-based redirect
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/donor-dashboard");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4 font-sans">
      
      {/* 🛡️ Login Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] rounded-[2.5rem] overflow-hidden">
        
        {/* Top Branding Accent */}
        <div className="h-2 bg-red-600 w-full"></div>

        <div className="p-10 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🩸</div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome <span className="text-red-600">Back</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Enter your credentials to access your BloodNet account.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
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

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-red-100 outline-none text-gray-700 font-medium placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-[1.5rem] shadow-xl shadow-red-100 transition-all active:scale-[0.97] mt-4 text-lg"
            >
              Sign In
            </button>
          </div>

          {/* Bottom Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-red-600 font-bold hover:underline underline-offset-4"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Security Tagline */}
        <div className="pb-8 text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            Secure Access • BloodNet AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;