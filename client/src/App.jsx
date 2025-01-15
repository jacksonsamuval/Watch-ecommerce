import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Home from "./pages/home"
import AddProductForm from "./pages/AddProductForm";
import ProductList from "./pages/ProductList";
import LuxuryCollection from "./pages/LuxuryCollection";
import Sports from "./pages/Sports";
import ModernClassicCollection from "./pages/ModernClassicCollection";
import Collections from "./pages/Collections";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";

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
          <Route
            path="/addProductForm"
            element={<AddProductForm/>}
          />
          <Route 
            path="/productList"
            element={<ProductList/>}
            />
            <Route 
            path="/luxury-collection"
            element={<LuxuryCollection/>}
            />
            <Route 
            path="/modernClassical"
            element={<ModernClassicCollection/>}
            />
            <Route 
            path="/sports"
            element={<Sports/>}
            />
            <Route 
            path="/collections"
            element={<Collections/>}
            />
            <Route 
            path="/aboutUs"
            element={<AboutUs/>}
            />
            <Route 
            path="/cart"
            element={<Cart/>}
            />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
