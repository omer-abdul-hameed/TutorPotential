import { useContext, useState } from "react";
import { UserContext } from "../../components/User";
import axios from 'axios';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [studentForm, setStudentForm] = useState({ gradeLevel: "", subjectsOfInterest: [] });
    const [tutorForm, setTutorForm] = useState({ subjectsTaught: [], rates: "", areaOfOperation: "" });
    const [currentSubjectStudent, setCurrentSubjectStudent] = useState('');
    const [currentSubjectTutor, setCurrentSubjectTutor] = useState('');

    const handleInputChange = (e, setter) => {
        setter(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const addSubjectToStudent = () => {
        setStudentForm(prevState => ({
            ...prevState,
            subjectsOfInterest: [...prevState.subjectsOfInterest, currentSubjectStudent]
        }));
        setCurrentSubjectStudent('');
    };

    const addSubjectToTutor = () => {
        setTutorForm(prevState => ({
            ...prevState,
            subjectsTaught: [...prevState.subjectsTaught, currentSubjectTutor]
        }));
        setCurrentSubjectTutor('');
    };

    const logout = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/logout');
            if (response.data.message === "Logged out successfully") {
                window.location.href = '/login';
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
            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
            if (!token) {
                console.error("JWT token not found. Please login again.");
                return;
            }
            const response = await axios.post('/api/students', studentForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Student profile created:", response.data);
        } catch (error) {
            console.error("Error creating student profile:", error);
        }
    };

    const createTutor = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
            if (!token) {
                console.error("JWT token not found. Please login again.");
                return;
            }
            const response = await axios.post('/api/tutors', tutorForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Tutor profile created:", response.data);
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
                        className="fixed top-4 right-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        disabled={loading}
                    >
                        Logout
                    </button>
                    <h1 className="text-4xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Dashboard</h1>
                    <div className="mt-4">
                        <h2 className="text-3xl">Welcome {user.name}!</h2>
                        <p className="text-xl mt-2">Email: {user.email}</p>
                        
                        <h3 className="text-2xl mt-4">Create Student Profile</h3>
                        <input 
                            type="text"
                            value={currentSubjectStudent}
                            onChange={e => setCurrentSubjectStudent(e.target.value)}
                            placeholder="Type a subject and add"
                        />
                        <button type="button" onClick={addSubjectToStudent}>Add Subject</button>
                        <ul>
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
                        />
                        <button 
                            onClick={createStudent}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Save Student Profile
                        </button>

                        <h3 className="text-2xl mt-4">Create Tutor Profile</h3>
                        <input 
                            type="text"
                            value={currentSubjectTutor}
                            onChange={e => setCurrentSubjectTutor(e.target.value)}
                            placeholder="Type a subject and add"
                        />
                        <button type="button" onClick={addSubjectToTutor}>Add Subject</button>
                        <ul>
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
                        />
                        <input 
                            type="text"
                            name="areaOfOperation"
                            value={tutorForm.areaOfOperation}
                            onChange={(e) => handleInputChange(e, setTutorForm)}
                            placeholder="Area of Operation"
                        />
                        <button 
                            onClick={createTutor}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Save Tutor Profile
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
