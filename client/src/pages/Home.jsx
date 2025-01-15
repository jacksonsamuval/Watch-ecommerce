import React from "react";
import "../css/Home.css"; 

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
    <section className="hero-section">
    <div className="hero-image-container">
        <img src="banner01.jpg" alt="Timeless Elegance" className="hero-image" />
    </div>
    <div className="hero-overlay">
        <div className="hero-content">
        <h1 className="hero-title">Timeless Elegance</h1>
        <p className="hero-subtitle">
            Elevate your style with our exclusive collection of watches.
        </p>
        <div className="hero-buttons">
            <button className="cta-button primary">Shop Now</button>
            <button className="cta-button secondary">Explore Collections</button>
        </div>
        </div>
    </div>
    </section>


      {/* Featured Collections Section */}
      <section className="collections-section">
        <h2>Our Featured Collections</h2>
        <div className="collection-grid">
          <div className="collection">
            <img src="watch01.jpg" alt="Luxury Collection" />
            <h3>Luxury Collection</h3>
            <p>Crafted for sophistication and style.</p>
          </div>
          <div className="collection">
            <img src="watch02.jpg" alt="Modern Classics" />
            <h3>Modern Classics</h3>
            <p>Minimalist designs for everyday elegance.</p>
          </div>
          <div className="collection">
            <img src="watch01.jpg" alt="Sports Series" />
            <h3>Sports Series</h3>
            <p>Durable and dynamic watches for the active life.</p>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-products">
        <h2>Trending Now</h2>
        <div className="product-grid">
          <div className="product">
            <img src="watch01.jpg" alt="Classic Watch" />
            <h3>Classic Watch</h3>
            <p>$199</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="product">
            <img src="watch02.jpg" alt="Luxury Watch" />
            <h3>Luxury Watch</h3>
            <p>$399</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="product">
            <img src="watch01.jpg" alt="Smart Watch" />
            <h3>Smart Watch</h3>
            <p>$299</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"Exceptional quality and stunning design. I love my new watch!"</p>
            <h4>- Alex</h4>
          </div>
          <div className="testimonial">
            <p>"Unmatched elegance and timely delivery. Highly recommended!"</p>
            <h4>- Sarah</h4>
          </div>
          <div className="testimonial">
            <p>"Fantastic service and a product that truly stands out."</p>
            <h4>- Michael</h4>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2 class="footer-button">Stay Updated</h2>
          <p>Sign up for exclusive updates, offers, and more.</p>
          <form>  <br/>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </div>
        <br/>
        <p>&copy; 2025 JS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
