import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../User";
import { FiLogOut } from 'react-icons/fi';

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
    <nav className="bg-blue-600 p-4 shadow-md flex items-center">
      <div className="flex-1 flex space-x-4">
        {user && (
          <>
            <Link
              to="/students"
              className="text-white px-4 py-2 hover:bg-blue-700 rounded"
            >
              Students
            </Link>
            <Link
              to="/tutors"
              className="text-white px-4 py-2 hover:bg-blue-700 rounded"
            >
              Tutors
            </Link>
          </>
        )}
      </div>

      <div className="flex-none">
        <Link to="/" className="text-white text-3xl hover:bg-blue-700 rounded">
          TutorPotential
        </Link>
      </div>

      <div className="flex-1 flex justify-end space-x-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-white px-4 py-2 hover:bg-blue-700 rounded"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="p-2 rounded-full transform transition duration-200 hover:scale-150"
              disabled={loading}
            >
              <FiLogOut className="text-2xl text-red-500 hover:text-red-600" />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="text-white px-4 py-2 hover:bg-blue-700 rounded"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white px-4 py-2 hover:bg-blue-700 rounded"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}