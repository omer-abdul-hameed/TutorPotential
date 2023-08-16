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
  

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Students</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student) => (
          <div
            key={student._id}
            className="student-card bg-gray-700 bg-opacity-70 shadow-lg rounded-lg p-6 backdrop-blur-md text-gray-300"
          >
            <h3 className="text-xl font-semibold mb-4">{student.user.name}</h3>
            <p className="mb-4">{student.user.email}</p>
            <p className="mb-2">Grade Level: {ordinalSuffix(student.gradeLevel)}</p>
            <p className="font-semibold mb-2">Needs Help With:</p>
            <ul className="list-disc pl-4">
              {student.subjectsOfInterest.map((subject, index) => (
                <li key={index} className="mb-1">
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

