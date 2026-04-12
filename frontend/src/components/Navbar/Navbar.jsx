import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b-2 border-slate-50 px-10 py-5 flex items-center font-sans sticky top-0 z-50">

      {/* LOGO - Bold & Professional */}
      <h1 
        className="font-black text-2xl text-slate-900 cursor-pointer tracking-tighter" 
        onClick={() => navigate("/")}
      >
        <span className="text-red-600">🩸</span> BloodNet<span className="text-red-600">AI</span>
      </h1>

      {/* MENU - Updated with Slate Colors */}
      <div className="flex space-x-8 ml-auto mr-8 text-slate-600 font-bold text-sm uppercase tracking-wide">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-red-600 border-b-2 border-red-600 pb-1"
                : "hover:text-red-600"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/find-donor"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-red-600 border-b-2 border-red-600 pb-1"
                : "hover:text-red-600"
            }`
          }
        >
          Find Donor
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-red-600 border-b-2 border-red-600 pb-1"
                : "hover:text-red-600"
            }`
          }
        >
          Register
        </NavLink>

        <NavLink
          to="/emergency"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-red-600 border-b-2 border-red-600 pb-1"
                : "hover:text-red-600"
            }`
          }
        >
          Emergency
        </NavLink>

        <NavLink
          to="/ai-chat"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-red-600 border-b-2 border-red-600 pb-1"
                : "hover:text-red-600"
            }`
          }
        >
          AI Chat
        </NavLink>

        {/* 👇 Show only when logged in */}
        {role && (
          <NavLink
            to="/donor-dashboard"
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600 pb-1"
                  : "hover:text-red-600"
              }`
            }
          >
            Dashboard
          </NavLink>
        )}

        {/* 👇 Admin Only */}
        {role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600 pb-1"
                  : "hover:text-red-600"
              }`
            }
          >
            Admin
          </NavLink>
        )}

      </div>

      {/* RIGHT SIDE AUTH */}
      <div className="flex items-center gap-4">

        {/* ❌ Not Logged In */}
        {!role && (
          <>
            <Link to="/login">
              <button className="text-slate-900 font-bold px-5 py-2 hover:text-red-600 transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-100 transition-all active:scale-95">
                Signup
              </button>
            </Link>
          </>
        )}

        {/* ✅ Logged In */}
        {role && (
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <span className="text-slate-900 font-black text-sm">
              <span className="text-slate-400 font-bold mr-1 italic">HI,</span> {name?.toUpperCase()}
            </span>

            <div className="h-4 w-[2px] bg-slate-200"></div>

            <button
              onClick={handleLogout}
              className="text-red-600 font-black text-xs uppercase tracking-widest hover:text-red-800 transition"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;