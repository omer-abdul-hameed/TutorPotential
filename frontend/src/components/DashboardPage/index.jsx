import { useContext, useState } from "react";
import { UserContext } from "../../components/User";
import axios from 'axios';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

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
    }

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
                    </div>
                </>
            )}
        </div>
    );
}
