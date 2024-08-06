import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    let result = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!result.ok) {
      throw new Error("Network response was not ok");
    }

    result = await result.json(); // Extract the JSON data from the response
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct email and password");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleLogin}>
        <p className="form-title">Log in to your account</p>
        <div className="input-container">
          <input
            placeholder="Enter email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email" // Correct value for email
          />
          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password" // Correct value for current password
          />
          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Login
        </button>
        <p className="signup-link">
          No account?
          <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
