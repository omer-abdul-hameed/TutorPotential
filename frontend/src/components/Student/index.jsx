import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../User";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function StudentInfo({ studentDetails, setStudentDetails }) {
  const { user } = useContext(UserContext);
  const [studentForm, setStudentForm] = useState({
    gradeLevel: "",
    subjectsOfInterest: [],
  });

  const [editFormData, setEditFormData] = useState({
    gradeLevel: "",
    subjectsOfInterest: [],
  });

  const [currentSubjectStudent, setCurrentSubjectStudent] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  useEffect(() => {
    async function fetchStudentDetails() {
      try {
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
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    }

    fetchStudentDetails();
  }, []);

  const handleInputChange = (e, setter) => {
    setter((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  function ordinalSuffix(number) {
    if (number % 10 === 1 && number !== 11) {
      return number + "st";
    } else if (number % 10 === 2 && number !== 12) {
      return number + "nd";
    } else if (number % 10 === 3 && number !== 13) {
      return number + "rd";
    } else {
      return number + "th";
    }
  }
  

  const addSubjectToStudent = () => {
    const updatedSubjects = [
      ...studentForm.subjectsOfInterest,
      currentSubjectStudent,
    ];

    setStudentForm((prevState) => ({
      ...prevState,
      subjectsOfInterest: updatedSubjects,
    }));

    setEditFormData((prevState) => ({
      ...prevState,
      subjectsOfInterest: updatedSubjects,
    }));

    setCurrentSubjectStudent("");
  };

  const removeSubjectFromStudent = (subject) => {
    const updatedSubjects = studentForm.subjectsOfInterest.filter(
      (s) => s !== subject
    );

    setStudentForm((prevState) => ({
      ...prevState,
      subjectsOfInterest: updatedSubjects,
    }));

    setEditFormData((prevState) => ({
      ...prevState,
      subjectsOfInterest: updatedSubjects,
    }));
  };

  const createStudent = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      if (!token) {
        console.error("JWT token not found. Please login again.");
        return;
      }
      const response = await axios.post("/api/students", studentForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Student profile created:", response.data);
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error creating student profile:", error);
    }
  };
  const editStudent = async (studentId, studentData) => {
    try {
      const response = await axios.put(
        `/api/students/${studentId}`,
        studentData
      );
      if (response.status === 200) {
        console.log("Student updated successfully:", response.data);
        setStudentDetails(response.data);
        setShowEditForm(false);
      } else {
        console.error("Error updating the student:", response.data);
      }
    } catch (error) {
      console.error("Error updating the student:", error);
    }
  };

  const handleEditInputChange = (e) => {
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteStudent = async () => {
    if (!studentDetails || !studentDetails._id) {
      console.error("Student details missing or student ID not found.");
      return;
    }

    try {
      const response = await axios.delete(
        `/api/students/${studentDetails._id}`
      );
      if (response.status === 200) {
        console.log("Student successfully deleted");
        setStudentDetails(null);
      } else {
        console.error("Error deleting student:", response.data);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      {!studentDetails && !showCreateForm && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition block w-full mt-4"
        >
          Add Student Profile
        </button>
      )}

      {showCreateForm && (
        <div>
          <h3 className="text-2xl mb-4 mt-4 text-white">
            Create Student Profile
          </h3>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              value={currentSubjectStudent}
              onChange={(e) => setCurrentSubjectStudent(e.target.value)}
              placeholder="Type a subject and add"
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={addSubjectToStudent}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-6 text-white">
            {studentForm.subjectsOfInterest.map((subject, index) => (
              <li key={index}>
                {subject}
                <MdOutlineClose
                  onClick={() => removeSubjectFromStudent(subject)}
                  className="ml-2 text-red-500 cursor-pointer"
                  size={18}
                />
              </li>
            ))}
          </ul>
          <input
            type="text"
            name="gradeLevel"
            value={studentForm.gradeLevel}
            onChange={(e) => handleInputChange(e, setStudentForm)}
            placeholder="Grade Level"
            className="mt-4 p-2 border rounded w-full"
          />
          <button
            onClick={createStudent}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition block w-full"
          >
            Save Student Profile
          </button>
        </div>
      )}

      {studentDetails && !showEditForm && (
        <div className="flex flex-col items-center">
          <h3 className="text-2xl mb-4 text-white">Student Profile</h3>
          <p className="text-lg mb-2 text-white">
          Grade Level: {ordinalSuffix(studentDetails.gradeLevel)}
          </p>
          <p className="text-lg mb-4 text-white">
            Subjects Needed: {studentDetails.subjectsOfInterest.join(", ")}
          </p>
          <div className="flex justify-between w-full">
            <button
              onClick={deleteStudent}
              className="flex items-center transform transition duration-200 hover:scale-150"
            >
              <AiOutlineDelete className="mr-2 text-3xl text-red-500 hover:text-red-600" />
            </button>
            <button
              onClick={() => {
                setEditFormData({
                  gradeLevel: studentDetails.gradeLevel,
                  subjectsOfInterest: studentDetails.subjectsOfInterest,
                });
                setShowEditForm(true);
              }}
              className="flex items-center transform transition duration-200 hover:scale-150"
            >
              <AiOutlineEdit className="mr-2 text-3xl text-yellow-500 hover:text-yellow-600" />
            </button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div>
          <h3 className="text-2xl mb-4 mt-4 text-white">
            Edit Student Profile
          </h3>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              value={currentSubjectStudent}
              onChange={(e) => setCurrentSubjectStudent(e.target.value)}
              placeholder="Type a subject and add"
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={addSubjectToStudent}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-6 text-white">
            {editFormData.subjectsOfInterest.map((subject, index) => (
              <li key={index}>
                {subject}
                <MdOutlineClose
                  onClick={() => removeSubjectFromStudent(subject)}
                  className="ml-2 text-red-500 cursor-pointer"
                  size={18}
                />
              </li>
            ))}
          </ul>
          <input
            type="text"
            name="gradeLevel"
            value={editFormData.gradeLevel}
            onChange={handleEditInputChange}
            placeholder="Grade Level"
            className="mt-4 p-2 border rounded w-full"
          />
          <button
            onClick={() => editStudent(studentDetails._id, editFormData)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition block w-full"
          >
            Update Student Profile
          </button>
          <button
            onClick={() => setShowEditForm(false)}
            className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition block w-full"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
