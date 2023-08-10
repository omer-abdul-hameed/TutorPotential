import React from "react";
import HomePage from "../HomePage";
import Navbar from "../Navbar";
import Register from "../RegisterPage";
import Login from "../LoginPage";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../User";
import Dashboard from "../DashboardPage";
import "bootstrap/dist/css/bootstrap.min.css"


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}
