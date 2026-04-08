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
    <nav className="bg-white shadow-md px-10 py-4 flex items-center">

      {/* LOGO */}
      <h1 className="font-bold text-2xl text-primary cursor-pointer" onClick={() => navigate("/")}>
        🩸 BloodNet AI
      </h1>

      {/* MENU */}
      <div className="flex space-x-8 ml-auto mr-6 text-gray-700 font-medium">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `pb-1 transition ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/find-donor"
          className={({ isActive }) =>
            `pb-1 transition ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "hover:text-primary"
            }`
          }
        >
          Find Donor
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `pb-1 transition ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "hover:text-primary"
            }`
          }
        >
          Register Donor
        </NavLink>

        <NavLink
          to="/emergency"
          className={({ isActive }) =>
            `pb-1 transition ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "hover:text-primary"
            }`
          }
        >
          Emergency
        </NavLink>

        <NavLink
          to="/ai-chat"
          className={({ isActive }) =>
            `pb-1 transition ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "hover:text-primary"
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
              `pb-1 transition ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-primary"
              }`
            }
          >
            Donor Dashboard
          </NavLink>
        )}

        {/* 👇 Admin Only */}
        {role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `pb-1 transition ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-primary"
              }`
            }
          >
            Admin Panel
          </NavLink>
        )}

      </div>

      {/* RIGHT SIDE AUTH */}
      <div className="flex items-center gap-4">

        {/* ❌ Not Logged In */}
        {!role && (
          <>
            <Link to="/login">
              <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primaryDark transition">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="border border-primary text-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition">
                Signup
              </button>
            </Link>
          </>
        )}

        {/* ✅ Logged In */}
        {role && (
          <>
            <span className="text-gray-600 font-medium">
              👋 {name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;