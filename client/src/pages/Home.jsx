import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id")); 
  const navigate = useNavigate();

  const handleShopNow = () => navigate("/productList");
  const handleExploreCollections = () => navigate("/collections");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/get-products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!userId) {
      alert("Please log in to add products to the cart");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add-to-cart", {
        userId: localStorage.getItem("id"),  
        productId: productId,
        quantity: 1, 
      });
      alert(response.data.message); 
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src="banner04.jpg" alt="Timeless Elegance" className="hero-image" />
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Timeless Elegance</h1>
            <p className="hero-subtitle">Elevate your style with our exclusive collection of watches.</p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={handleShopNow}>Shop Now</button>
              <button className="cta-button secondary" onClick={handleExploreCollections}>Explore Collections</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="collections-section">
        <h2>Our Featured Collections</h2>
        <div className="collection-grid">
          <a href="/luxury-collection" className="collection">
            <div className="collection">
              <img src="Rolex02.jpg" alt="Luxury Collection" />
              <h3 className="normal-text">Luxury Collection</h3>
              <p className="normal-text">Crafted for sophistication and style.</p>
            </div>
          </a>

          <a href="/modernClassical" className="collection">
            <div className="collection">
              <img src="fossil05.jpg" alt="Modern Classics" />
              <h3 className="normal-text">Modern Classics</h3>
              <p className="normal-text">Crafted for sophistication and style.</p>
            </div>
          </a>
          <a href="/sports" className="collection">
            <div className="collection">
              <img src="sport02.jpg" alt="Sports" />
              <h3 className="normal-text">Sports Series</h3>
              <p className="normal-text">Durable and dynamic watches for the active life.</p>
            </div>
          </a>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-products">
        <h2>Trending Now</h2>
        {products.length > 0 ? (
          <div className="product-grid">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="product">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3> <br />
                <p style={{ color: "green" }}>₹{product.price}</p>
                <p style={{ color: "grey" }}>{product.description}</p>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product._id)} // Pass productId to handleAddToCart
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-slider">
          {["Alex", "Sarah", "Michael"].map((name, idx) => (
            <div key={idx} className="testimonial">
              <p>
                {idx === 0
                  ? '"Exceptional quality and stunning design. I love my new watch!"'
                  : idx === 1
                  ? '"Unmatched elegance and timely delivery. Highly recommended!"'
                  : '"Fantastic service and a product that truly stands out."'}
              </p>
              <h4>- {name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links"></div>
        <p>&copy; 2025 JS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
