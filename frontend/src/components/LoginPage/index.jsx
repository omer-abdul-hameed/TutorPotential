import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { UserContext } from "../User"; 

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(<FiEyeOff />);
    const { setUser } = useContext(UserContext); 

    const handleToggle = () => {
        if (type === "password") {
            setIcon(<FiEye />);
            setType("text");
        } else {
            setIcon(<FiEyeOff />);
            setType("password");
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data: responseData } = await axios.post("api/auth/login", {
                email,
                password,
            });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setUser(responseData); 
                setData({});
                toast.success("Login Successful");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Failed to log in. Please try again.");
        }
    };

    return (
        <div className="Auth-form-container flex justify-center items-center h-screen bg-gray-100">
            <form
                className="Auth-form bg-white p-8 rounded shadow-md"
                onSubmit={loginUser}
            >
                <h3 className="Auth-form-title text-2xl font-bold mb-4">Sign In</h3>

                <div className="form-group mt-3">
                    <label className="block text-sm font-medium text-gray-600">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control mt-1 p-2 w-full border rounded"
                        placeholder="Enter email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>

                <div className="form-group mt-3 relative">
                    <label className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type={type}
                        className="form-control mt-1 p-2 w-full border rounded"
                        placeholder="Enter password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <span
                        className="absolute right-2 top-1/2 transform translate-y-1/3 cursor-pointer"
                        onClick={handleToggle}
                    >
                        {icon}
                    </span>
                </div>

                <div className="mt-4 mb-2 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Don't have an account? Sign up!
                    </Link>
                </div>

                <div className="d-grid gap-2 mt-3">
                    <button
                        type="submit"
                        className="btn bg-gradient-to-r from-blue-400 to-blue-600 text-white p-2 rounded hover:from-blue-600 hover:to-blue-800"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
