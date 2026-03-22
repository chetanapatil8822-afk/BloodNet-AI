import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      <h1 className="font-bold text-2xl text-primary">
        🩸 BloodNet AI
      </h1>

      <div className="space-x-6 flex text-gray-700 font-medium">
        <Link to="/">Home</Link>
        <Link to="/find-donor">Find Donor</Link>
        <Link to="/register">Register Donar</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/ai-chat">AI Chat</Link>
      </div>

      <Link to="/register">
        <button className="bg-primary text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </Link>

    </nav>
  );
}

export default Navbar;