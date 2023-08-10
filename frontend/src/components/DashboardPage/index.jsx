import { useContext } from "react";
import { UserContext } from "../../components/User";

export default function Dashboard() {
    const { user } = useContext(UserContext);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8">
            <h1 className="text-4xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Dashboard</h1>
            {!!user && (
                <div className="mt-4">
                    <h2 className="text-3xl">Welcome {user.name}!</h2>
                    <p className="text-xl mt-2">Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}
