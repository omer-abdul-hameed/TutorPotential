import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../components/User";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StudentInfo from "../Student";
import TutorInfo from "../Tutor";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [studentDetails, setStudentDetails] = useState(null);
  const [tutorDetails, setTutorDetails] = useState(null);

  useEffect(() => {
    fetchStudentAndTutor();
  }, []);

  const fetchStudentAndTutor = async () => {
    try {
      // Extract JWT token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      if (!token) {
        console.error("JWT token not found. Please login again.");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const studentRes = await axios.get("/api/students/me");
      setStudentDetails(studentRes.data);

      const tutorRes = await axios.get("/api/tutors/me");
      setTutorDetails(tutorRes.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  const deleteProfile = async () => {
    try {
      const response = await axios.delete(`/api/users/${user._id}`);
      if (response.status === 200) {
        console.log("Profile successfully deleted");
        setUser(null); 
        toast.success("Account deleted");
        navigate("/login");
      } else {
        console.error("Error deleting profile:", response.data);
        toast.error("Error deleting profile. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Error deleting profile. Please try again.");
    }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 relative">
      {!!user && (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold mb-6 border-b-2 border-blue-500 pb-4">
            Dashboard
          </h1>
          <h2 className="text-3xl mb-4">Welcome {user.name}!</h2>
          <p className="text-xl mb-6">Email: {user.email}</p>

          {!studentDetails && !tutorDetails && (
            <>
              <StudentInfo
                studentDetails={null}
                setStudentDetails={setStudentDetails}
              />
              <TutorInfo
                tutorDetails={null}
                setTutorDetails={setTutorDetails}
              />
            </>
          )}

          {studentDetails && !tutorDetails && (
            <StudentInfo
              studentDetails={studentDetails}
              setStudentDetails={setStudentDetails}
            />
          )}

          {!studentDetails && tutorDetails && (
            <TutorInfo
              tutorDetails={tutorDetails}
              setTutorDetails={setTutorDetails}
            />
          )}
        </div>
      )}
      <button
        onClick={deleteProfile}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-700 mt-4 ml-4"
      >
        Delete Profile
      </button>
    </div>
  );
}
