import React from "react";
import HomePage from "../HomePage";
import Navbar from "../Navbar";
import Register from "../RegisterPage";
import Login from "../LoginPage";
import StudentsIndex from "../StudentsPage";
import TutorIndex from "../TutorsPage";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../User";
import Dashboard from "../DashboardPage";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <div className="bg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentsIndex />} />
          <Route path="/tutors" element={<TutorIndex />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}
