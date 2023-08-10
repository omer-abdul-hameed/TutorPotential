import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <Link to='/' className="text-white px-4 py-2 hover:bg-blue-700 rounded">
        Home
      </Link>
      <Link to='/register' className="text-white px-4 py-2 hover:bg-blue-700 rounded ml-4">
        Register
      </Link>
      <Link to='/login' className="text-white px-4 py-2 hover:bg-blue-700 rounded ml-4">
        Login
      </Link>
    </nav>
  )
}
