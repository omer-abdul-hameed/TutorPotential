import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/User";
import axios from "axios";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [studentForm, setStudentForm] = useState({
    gradeLevel: "",
    subjectsOfInterest: [],
  });
  const [tutorForm, setTutorForm] = useState({
    subjectsTaught: [],
    rates: "",
    areaOfOperation: "",
  });
  const [currentSubjectStudent, setCurrentSubjectStudent] = useState("");
  const [currentSubjectTutor, setCurrentSubjectTutor] = useState("");
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

  const handleInputChange = (e, setter) => {
    setter((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const addSubjectToStudent = () => {
    setStudentForm((prevState) => ({
      ...prevState,
      subjectsOfInterest: [
        ...prevState.subjectsOfInterest,
        currentSubjectStudent,
      ],
    }));
    setCurrentSubjectStudent("");
  };

  const addSubjectToTutor = () => {
    setTutorForm((prevState) => ({
      ...prevState,
      subjectsTaught: [...prevState.subjectsTaught, currentSubjectTutor],
    }));
    setCurrentSubjectTutor("");
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/logout");
      if (response.data.message === "Logged out successfully") {
        window.location.href = "/login";
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("There was an error logging out:", error);
    }
    setLoading(false);
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

      // Update the studentDetails state directly
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error creating student profile:", error);
    }
  };

  const createTutor = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      if (!token) {
        console.error("JWT token not found. Please login again.");
        return;
      }
      const response = await axios.post("/api/tutors", tutorForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Tutor profile created:", response.data);

      // Update the tutorDetails state directly
      setTutorDetails(response.data);
    } catch (error) {
      console.error("Error creating tutor profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 relative">
        {!!user && (
            <>
                <button
                    onClick={logout}
                    className="fixed top-4 right-4 bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition"
                    disabled={loading}
                >
                    Logout
                </button>
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-semibold mb-6 border-b-2 border-blue-500 pb-4">
                        Dashboard
                    </h1>
                    <h2 className="text-3xl mb-4">Welcome {user.name}!</h2>
                    <p className="text-xl mb-6">Email: {user.email}</p>

                    {!studentDetails && !tutorDetails ? (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl mb-4">Create Student Profile</h3>
                                <div className="flex space-x-4 mb-4">
                                    <input
                                        type="text"
                                        value={currentSubjectStudent}
                                        onChange={(e) => setCurrentSubjectStudent(e.target.value)}
                                        placeholder="Type a subject and add"
                                        className="p-2 border rounded w-full"
                                    />
                                    <button type="button" onClick={addSubjectToStudent} className="bg-blue-500 text-white p-2 rounded">
                                        Add
                                    </button>
                                </div>
                                <ul className="list-disc pl-6">
                                    {studentForm.subjectsOfInterest.map((subject, index) => (
                                        <li key={index}>{subject}</li>
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

                            <div>
                                <h3 className="text-2xl mb-4">Create Tutor Profile</h3>
                                <div className="flex space-x-4 mb-4">
                                    <input
                                        type="text"
                                        value={currentSubjectTutor}
                                        onChange={(e) => setCurrentSubjectTutor(e.target.value)}
                                        placeholder="Type a subject and add"
                                        className="p-2 border rounded w-full"
                                    />
                                    <button type="button" onClick={addSubjectToTutor} className="bg-blue-500 text-white p-2 rounded">
                                        Add
                                    </button>
                                </div>
                                <ul className="list-disc pl-6 mb-4">
                                    {tutorForm.subjectsTaught.map((subject, index) => (
                                        <li key={index}>{subject}</li>
                                    ))}
                                </ul>
                                <input
                                    type="text"
                                    name="rates"
                                    value={tutorForm.rates}
                                    onChange={(e) => handleInputChange(e, setTutorForm)}
                                    placeholder="Rates"
                                    className="p-2 border rounded w-full"
                                />
                                <input
                                    type="text"
                                    name="areaOfOperation"
                                    value={tutorForm.areaOfOperation}
                                    onChange={(e) => handleInputChange(e, setTutorForm)}
                                    placeholder="Area of Operation"
                                    className="mt-4 p-2 border rounded w-full"
                                />
                                <button
                                    onClick={createTutor}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition block w-full"
                                >
                                    Save Tutor Profile
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {studentDetails && (
                                <div>
                                    <h3 className="text-2xl mb-4">Student Profile</h3>
                                    <p className="text-lg mb-2">Grade Level: {studentDetails.gradeLevel}</p>
                                    <p className="text-lg">
                                        Subjects of Interest: {studentDetails.subjectsOfInterest.join(", ")}
                                    </p>
                                </div>
                            )}

                            {tutorDetails && (
                                <div>
                                    <h3 className="text-2xl mb-4">Tutor Profile</h3>
                                    <p className="text-lg mb-2">
                                        Subjects Taught: {tutorDetails.subjectsTaught.join(", ")}
                                    </p>
                                    <p className="text-lg mb-2">Rate: ${tutorDetails.rates} / hr</p>
                                    <p className="text-lg">Area of Operation: {tutorDetails.areaOfOperation}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        )}
    </div>
);





}
