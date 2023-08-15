import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../User";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.get("api/auth/logout");
      if (response.data.message === "Logged out successfully") {
        toast.success("Logged Out");
        window.location.href = "/login";
      } else {
        console.error("Error logging out");
        toast.error("Token expired");
      }
    } catch (error) {
      console.error("There was an error logging out:", error);
      toast.error("Token expired");
    }
    setLoading(false);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <Link to="/" className="text-white px-4 py-2 hover:bg-blue-700 rounded">
        Home
      </Link>

      {user ? (
        <>
          <button
            onClick={logout}
            className="fixed top-4 right-4 bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition"
            disabled={loading}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/register"
            className="text-white px-4 py-2 hover:bg-blue-700 rounded ml-4"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-white px-4 py-2 hover:bg-blue-700 rounded ml-4"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
}
