import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../User";

export default function TutorInfo() {
  const { user } = useContext(UserContext);

  const [tutorForm, setTutorForm] = useState({
    subjectsTaught: [],
    rates: "",
    areaOfOperation: "",
  });
  const [editFormData, setEditFormData] = useState({
    subjectsTaught: [],
    rates: "",
    areaOfOperation: "",
});

  const [currentSubjectTutor, setCurrentSubjectTutor] = useState("");
  const [tutorDetails, setTutorDetails] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    // Fetch the tutor's details when the component is mounted
    fetchTutorDetails();
  }, []);

  const fetchTutorDetails = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      if (!token) {
        console.error("JWT token not found. Please login again.");
        return;
      }

      // Fetch tutor using the user ID
      const response = await axios.get("/api/tutors/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setTutorDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching tutor details:", error);
    }
  };

  const handleInputChange = (e, setter) => {
    setter((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const addSubjectToTutor = () => {
    const updatedSubjects = [...tutorForm.subjectsTaught, currentSubjectTutor];

    setTutorForm((prevState) => ({
        ...prevState,
        subjectsTaught: updatedSubjects,
    }));

    setEditFormData((prevState) => ({
        ...prevState,
        subjectsTaught: updatedSubjects,
    }));

    setCurrentSubjectTutor("");
};


const removeSubjectFromTutor = (subject) => {
    const updatedSubjects = tutorForm.subjectsTaught.filter((s) => s !== subject);

    setTutorForm((prevState) => ({
        ...prevState,
        subjectsTaught: updatedSubjects,
    }));

    setEditFormData((prevState) => ({
        ...prevState,
        subjectsTaught: updatedSubjects,
    }));
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
      setTutorDetails(response.data);
    } catch (error) {
      console.error("Error creating tutor profile:", error);
    }
  };
  const editTutor = async (tutorId, tutorData) => {
    try {
        const response = await axios.put(`/api/tutors/${tutorId}`, tutorData);

        if (response.status === 200) {
            console.log("Tutor updated successfully:", response.data);
            setTutorDetails(response.data);
            setShowEditForm(false);
        } else {
            console.error("Error updating the tutor:", response.data);
        }
    } catch (error) {
        console.error("Error updating the tutor:", error);
    }
};

// Handle the changes in the edit form
const handleEditInputChange = (e) => {
    setEditFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
};
  const deleteTutor = async () => {
    if (!tutorDetails || !tutorDetails._id) {
      console.error("Tutor details missing or tutor ID not found.");
      return;
    }

    try {
      const response = await axios.delete(`/api/tutors/${tutorDetails._id}`);
      if (response.status === 200) {
        console.log("Tutor successfully deleted");
        setTutorDetails(null);
      } else {
        console.error("Error deleting tutor:", response.data);
      }
    } catch (error) {
      console.error("Error deleting tutor:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
      {!tutorDetails && !showCreateForm && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition block w-full mt-4"
        >
          Add Tutor Profile
        </button>
      )}

      {showCreateForm && (
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
            <button
              type="button"
              onClick={addSubjectToTutor}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-6 mb-4">
            {tutorForm.subjectsTaught.map((subject, index) => (
              <li key={index}>
                {subject}
                <button
                  onClick={() => removeSubjectFromTutor(subject)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </li>
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
            onClick={() => {
              createTutor();
              window.location.reload();
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition block w-full"
          >
            Save Tutor Profile
          </button>
        </div>
      )}

      {tutorDetails && !showEditForm && (
    <div>
        <h3 className="text-2xl mb-4">Tutor Profile</h3>
        <p className="text-lg mb-2">
            Subjects Taught: {tutorDetails.subjectsTaught.join(", ")}
        </p>
        <p className="text-lg mb-2">Rate: ${tutorDetails.rates} / hr</p>
        <p className="text-lg">
            Area of Operation: {tutorDetails.areaOfOperation}
        </p>
        <button
            onClick={() => {
                deleteTutor();
                window.location.reload();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-700 mr-2"
        >
            Delete Tutor Profile
        </button>
        <button
            onClick={() => {
                setEditFormData({
                    subjectsTaught: tutorDetails.subjectsTaught,
                    rates: tutorDetails.rates,
                    areaOfOperation: tutorDetails.areaOfOperation
                });
                setShowEditForm(true);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-yellow active:bg-yellow-700"
        >
            Edit Tutor Profile
        </button>
    </div>
)}
{showEditForm && (
    <div>
        <h3 className="text-2xl mb-4">Edit Tutor Profile</h3>
        
        <div className="flex space-x-4 mb-4">
            <input
                type="text"
                value={currentSubjectTutor}
                onChange={(e) => setCurrentSubjectTutor(e.target.value)}
                placeholder="Type a subject and add"
                className="p-2 border rounded w-full"
            />
            <button
                type="button"
                onClick={addSubjectToTutor}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Add
            </button>
        </div>

        <ul className="list-disc pl-6 mb-4">
            {editFormData.subjectsTaught.map((subject, index) => (
                <li key={index}>
                    {subject}
                    <button
                        onClick={() => removeSubjectFromTutor(subject)}
                        className="ml-2 text-red-500"
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>

        <input
            type="text"
            name="rates"
            value={editFormData.rates}
            onChange={handleEditInputChange}
            placeholder="Rates"
            className="p-2 border rounded w-full"
        />
        
        <input
            type="text"
            name="areaOfOperation"
            value={editFormData.areaOfOperation}
            onChange={handleEditInputChange}
            placeholder="Area of Operation"
            className="mt-4 p-2 border rounded w-full"
        />

<button
    onClick={() => editTutor(tutorDetails._id, editFormData)}
    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition block w-full"
>
    Update Tutor Profile
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
