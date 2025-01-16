import React, { useState } from "react";
import axios from "axios";
import "../css/RegisterForm.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onRegisterSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/user/", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      alert("Registration successful");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");

      navigate("/")
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <div className="navbar-logo">
              <h1>JK</h1>  <br/>
          </div>

          <h2>Create an Account</h2>
          <p className="subheading">Fill in the details to register</p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
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

          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>

          <div className="footer">
            <p>
              Already have an account? <a href="/">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
