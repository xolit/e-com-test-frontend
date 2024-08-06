import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      let result = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      result = await result.json(); // Extract the JSON data from the response

      if (result) {
        localStorage.setItem("user", JSON.stringify(result.saved)); // Save the user data to localStorage
        navigate("/");
        console.log(result);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="form-box">
      <div className="form">
        <span className="title">Sign up</span>
        <form className="form-container" onSubmit={collectData}>
          <input
            type="text"
            className="input"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            className="input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Sign up</button>
        </form>
        <div className="form-section">
        <p>
          Have an account? <a href="/login">Log in</a>
        </p>
      </div>
      </div>
     
    </div>
  );
};

export default Signup;
