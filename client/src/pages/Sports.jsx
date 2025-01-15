import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductList.css'; 

const Sports = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/get-products');
        const allProducts = response.data;

        // Filter products by category "Sports"
        const sportsProducts = allProducts.filter(
          (product) => product.category === 'Sports'
        );

        setProducts(allProducts);
        setFilteredProducts(sportsProducts);
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
      <h1>Sports Series</h1>
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
        <p>No products found in the Sports Series</p>
      )}
    </div>
  );
};

export default Sports;
