import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    const response = await axios.post("http://localhost:3001/api/login", {
      email,
      password,
    });
    console.log("Login form submitted", response.data);

    // Assuming the login response indicates success
    onLogin(); // Update the logged-in state in App.js
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
