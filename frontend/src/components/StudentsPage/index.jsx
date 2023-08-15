import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentsIndex() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("/api/students");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {students.map(student => (
                    <div key={student._id} className="student-card bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">User ID: {student.user}</h3>
                        <p className="mb-2">Grade Level: {student.gradeLevel}</p>
                        <p className="font-semibold mb-2">Subjects of Interest:</p>
                        <ul className="list-disc pl-4">
                            {student.subjectsOfInterest.map((subject, index) => (
                                <li key={index} className="mb-1">{subject}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

