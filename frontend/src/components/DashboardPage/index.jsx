import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../components/User";
import StudentInfo from "../Student"; // Ensure the path is correct
import TutorInfo from "../Tutor"; // Ensure the path is correct

export default function Dashboard() {
  const { user } = useContext(UserContext);
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

      // Set axios default headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch student using the user ID
      const studentRes = await axios.get("/api/students/me");
      setStudentDetails(studentRes.data);

      // Similarly, fetch tutor using the user ID
      const tutorRes = await axios.get("/api/tutors/me");
      setTutorDetails(tutorRes.data);
    } catch (error) {
      console.error("Error fetching details:", error);
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
  
          {(!studentDetails && !tutorDetails) && (
            <>
              <StudentInfo studentDetails={null} setStudentDetails={setStudentDetails} />
              <TutorInfo tutorDetails={null} setTutorDetails={setTutorDetails} />
            </>
          )}
  
          {studentDetails && !tutorDetails && (
            <StudentInfo studentDetails={studentDetails} setStudentDetails={setStudentDetails} />
          )}
  
          {!studentDetails && tutorDetails && (
            <TutorInfo tutorDetails={tutorDetails} setTutorDetails={setTutorDetails} />
          )}
        </div>
      )}
    </div>
  );
  

          }  
