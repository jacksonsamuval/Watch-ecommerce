import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
import "../css/LoginForm.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
        localStorage.setItem("firstName", response.data.firstName); 
        localStorage.setItem("lastName", response.data.lastName);
        localStorage.setItem("email", response.data.email); 
        if (onLoginSuccess) onLoginSuccess();
        alert("Login Successfull")
        console.log("Login SuccessFull");
        navigate("/home")
        
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="logo-container">
            <img src="#" alt="Logo" className="logo" />
          </div>

          <h2>Welcome Back</h2>
          <p className="subheading">Please log in to continue</p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>

          <div className="footer">
            <p>
              zt have an Account ? <a href="/register">Register</a> 
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
