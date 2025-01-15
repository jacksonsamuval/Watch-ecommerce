import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Home from "./pages/Home"

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Routes>
        <Route
            path="/"
            element={<LoginForm/>}
          />
          <Route
            path="/register"
            element={<RegisterForm/>}
          />
          <Route
            path="/home"
            element={<Home/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
