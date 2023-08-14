import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <div className="Auth-form-container flex justify-center items-center h-screen bg-gray-100">
      <form className="Auth-form bg-white p-8 rounded shadow-md" onSubmit={registerUser}>
        <h3 className="Auth-form-title text-2xl font-bold mb-4">Sign Up</h3>
        
        <div className="form-group mt-3">
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            className="form-control mt-1 p-2 w-full border rounded"
            placeholder="Enter Your Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        
        <div className="form-group mt-3">
          <label className="block text-sm font-medium text-gray-600">Email address</label>
          <input
            type="email"
            className="form-control mt-1 p-2 w-full border rounded"
            placeholder="Enter Your Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        
        <div className="form-group mt-3">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            className="form-control mt-1 p-2 w-full border rounded"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        
        <div className="mt-4 mb-2 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">Already Have an Account? Login</Link>
        </div>
        
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn bg-gradient-to-r from-blue-400 to-blue-600 text-white p-2 rounded hover:from-blue-600 hover:to-blue-800">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
// return (
//   <div>
//     <form onSubmit={registerUser}>
//       <label>Name</label>
//       <input
//         type="text"
//         placeholder="enter name"
//         value={data.name}
//         onChange={(e) => setData({ ...data, name: e.target.value })}
//       />
//       <label>Email</label>
//       <input
//         type="text"
//         placeholder="enter email"
//         value={data.email}
//         onChange={(e) => setData({ ...data, email: e.target.value })}
//       />
//       <label>Password</label>
//       <input
//         type="password"
//         placeholder="enter password"
//         value={data.password}
//         onChange={(e) => setData({ ...data, password: e.target.value })}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// ); }
