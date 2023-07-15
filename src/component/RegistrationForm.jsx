import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      mobileNumber: mobileNumber,
    };

    axios
      .post("http://localhost:3001/api/register", data)
      .then((response) => {
        // Handle the successful response
        console.log("Registration successful:", response.data);
        navigate("/"); // Navigate to the login page or any other desired page
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
    console.log("Registration form submitted");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
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
        <div>
          <label
            htmlFor="mobileNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className="w-full border-gray-300 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
