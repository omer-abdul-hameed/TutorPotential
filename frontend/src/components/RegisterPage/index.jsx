import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FiEyeOff />);
  const handleToggle = () => {
    if (type === "password") {
        setIcon(<FiEye />);
        setType("text");
    } else {
        setIcon(<FiEyeOff />);
        setType("password");
    }
};

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("api/auth/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("You are Registered. Please Login.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Auth-form-container flex justify-center items-center h-screen bg-gray-900">
      <form 
        className="Auth-form bg-gray-800 bg-opacity-60 p-8 rounded shadow-md backdrop-blur-md"
        onSubmit={registerUser}
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h3 className="Auth-form-title text-2xl font-bold text-gray-300 mb-4">Sign Up</h3>
        
        <div className="form-group mt-3">
          <label className="block text-sm font-medium text-gray-400">Full Name</label>
          <input
            type="text"
            className="form-control mt-1 p-2 w-full border rounded bg-white text-gray-900"
            placeholder="Enter Your Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        
        <div className="form-group mt-3">
          <label className="block text-sm font-medium text-gray-400">Email address</label>
          <input
            type="email"
            className="form-control mt-1 p-2 w-full border rounded bg-white text-gray-900"
            placeholder="Enter Your Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        
        <div className="form-group mt-3 relative">
    <label className="block text-sm font-medium text-gray-400">Password</label>
    <input
        type={type}
        className="form-control mt-1 p-2 w-full border rounded bg-white text-gray-900"
        placeholder="Password"
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
          <Link to="/login" className="text-blue-400 hover:underline">Already Have an Account? Login</Link>
        </div>
        
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition duration-500 ease-in-out">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
