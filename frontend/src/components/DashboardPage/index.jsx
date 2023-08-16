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
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  useEffect(() => {
    setEditFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  }, [user]);

  useEffect(() => {
    fetchStudentAndTutor();
  }, []);

  const fetchStudentAndTutor = async () => {
    try {
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

  const handleEditInputChange = (e) => {
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editProfile = async () => {
    try {
      // Create a copy of the editFormData
      const dataToSend = { ...editFormData };

      // If password is empty, remove it from the data to be sent to the server
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      const response = await axios.put(`/api/users/${user._id}`, dataToSend);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setUser(response.data);
      } else {
        toast.error("Error updating profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 relative">
      {showEditForm ? (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold mb-6 border-b-2 border-blue-500 pb-4">
            Edit Profile
          </h1>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
            placeholder="Name"
            className="p-2 border rounded w-full mb-4"
          />
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleEditInputChange}
            placeholder="Email"
            className="p-2 border rounded w-full mb-4"
          />
          <input
            type="password"
            name="password"
            value={editFormData.password}
            onChange={handleEditInputChange}
            placeholder="New Password (Leave blank to keep unchanged)"
            className="p-2 border rounded w-full mb-4"
          />
          <button
            onClick={() => {
              editProfile();
              setShowEditForm(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Update Profile
          </button>
          <button
            onClick={() => setShowEditForm(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray ml-4"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="w-full max-w-3xl flex justify-between mb-4">
            <button
              onClick={() => setShowEditForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            >
              Edit Profile
            </button>
            <button
              onClick={deleteProfile}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-700"
            >
              Delete Profile
            </button>
          </div>
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
        </>
      )}
    </div>
  );
  
}
