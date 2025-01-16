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
      console.log("Email from response:", response.data.data.email);
      console.log("Id from response:", response.data.data._id);
      localStorage.setItem("firstName", response.data.data.firstName); 
      localStorage.setItem("lastName", response.data.data.lastName);
      localStorage.setItem("email", response.data.data.email); 
      localStorage.setItem("id", response.data.data._id); 
      
      if (onLoginSuccess) onLoginSuccess();
      alert("Login Successfull");
      console.log("Login Successful");

      navigate("/home");
        
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="navbar-logo">
              <h1>JK</h1>  <br/>
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
              Don't have an Account ? <a href="/register">Register</a> 
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
