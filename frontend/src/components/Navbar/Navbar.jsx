import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-10 py-4 flex items-center">

      {/* LOGO */}
      <h1 className="font-bold text-2xl text-primary">
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

      </div>

      {/* LOGIN BUTTON */}
      <Link to="/register">
        <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primaryDark transition">
          Login
        </button>
      </Link>

    </nav>
  );
}

export default Navbar;