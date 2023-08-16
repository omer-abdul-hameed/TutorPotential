import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../components/User";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StudentInfo from "../Student";
import TutorInfo from "../Tutor";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [studentDetails, setStudentDetails] = useState(null);
  const [tutorDetails, setTutorDetails] = useState(null);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FiEyeOff />);
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
  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FiEye />);
      setType("text");
    } else {
      setIcon(<FiEyeOff />);
      setType("password");
    }
  };

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
      
      const dataToSend = { ...editFormData };

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
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 to-gray-900 flex flex-col justify-center items-center py-8 relative">
      {showEditForm ? (
        // Edit Profile Section
        <div className="w-full max-w-3xl bg-gray-700 p-8 rounded-lg shadow-md border border-gray-600">
          <h1 className="text-4xl font-semibold mb-6 border-b-2 border-blue-400 pb-4 text-gray-200">
            Edit Profile
          </h1>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditInputChange}
            placeholder="Name"
            className="p-2 border rounded w-full mb-4 bg-gray-800 text-white"
          />
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleEditInputChange}
            placeholder="Email"
            className="p-2 border rounded w-full mb-4 bg-gray-800 text-white"
          />
          <div className="relative mb-4">
            <input
              type={type}
              name="password"
              value={editFormData.password}
              onChange={handleEditInputChange}
              placeholder="New Password (Leave blank to keep unchanged)"
              className="p-2 border rounded w-full bg-gray-800 text-white"
            />
            <span
              className="absolute inset-y-0 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={handleToggle}
            >
              {icon}
            </span>
          </div>

          <div className="flex justify-between">
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
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center w-full mb-4">
    <div className="flex items-center space-x-48">
        <button
          onClick={deleteProfile}
          className="flex items-center transform transition duration-200"
        >
          <AiOutlineDelete className="mr-48 text-3xl text-red-500 hover:text-red-600" />
        </button>
        <button
          onClick={() => setShowEditForm(true)}
          className="flex items-center transform transition duration-200"
        >
          <AiOutlineEdit className="ml-24 text-3xl text-yellow-500 hover:text-yellow-600" />
        </button>
    </div>
</div>

          {!!user && (
            <div className="w-full max-w-3xl bg-gray-700 p-8 rounded-lg shadow-md border border-gray-600">
              <div className="text-center">
                <h1 className="text-4xl font-semibold mb-6 border-b-2 border-blue-400 pb-4 text-gray-200">
                  Dashboard
                </h1>
                <h2 className="text-3xl mb-2 text-gray-300">Welcome</h2>
                <h3 className="text-2xl mb-4 text-gray-200">{user.name}</h3>
                <p className="text-xl mb-6 text-gray-300">
                  Email: {user.email}
                </p>
              </div>

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
