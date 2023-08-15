import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function TutorIndex() {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        async function fetchTutors() {
            try {
                const response = await axios.get("/api/tutors");
                setTutors(response.data);
            } catch (error) {
                toast.error("Error fetching tutors");
                console.error("Error fetching tutors:", error);
            }
        }

        fetchTutors();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Tutors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutors.map(tutor => (
                    <div key={tutor._id} className="tutor-card bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">User ID: {tutor.user}</h3>
                        <p className="font-semibold mb-2">Subjects Taught:</p>
                        <ul className="list-disc pl-4">
                            {tutor.subjectsTaught.map((subject, index) => (
                                <li key={index} className="mb-1">{subject}</li>
                            ))}
                        </ul>
                        <p className="mb-2">Rate: ${tutor.rates} per hour</p>
                        <p>Area of Operation: {tutor.areaOfOperation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
