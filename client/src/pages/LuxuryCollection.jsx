import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductList.css'; // Import the CSS for styling

const LuxuryCollection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/get-products');
        const allProducts = response.data;

        // Filter products by category "Luxury Collection"
        const luxuryProducts = allProducts.filter(
          (product) => product.category === 'Luxury Collection'
        );

        setProducts(allProducts); // Optional: If you need the full list for other purposes
        setFilteredProducts(luxuryProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h1>Luxury Collection</h1>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-stock">Stock: {product.stock}</p>
                <button className="product-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in the Luxury Collection</p>
      )}
    </div>
  );
};

export default LuxuryCollection;
