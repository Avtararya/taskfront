import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./component/Login";
import RegistrationForm from "./component/RegistrationForm";
import Dashboard from "./component/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="bg-slate-100">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
