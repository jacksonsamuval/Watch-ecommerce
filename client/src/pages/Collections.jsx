import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductList.css'; 

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id")); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/get-products');
        const allProducts = response.data;

        const categories = Array.from(new Set(allProducts.map(product => product.category)));

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        setSelectedCategory(randomCategory);

        // Filter products by the random selected category
        const categoryProducts = allProducts.filter(product => product.category === randomCategory);
        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
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
        userId: userId, 
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
    <div className="product-list">
      <h1>{selectedCategory} Products</h1>
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
                <button
                  className="product-button"
                  onClick={() => handleAddToCart(product._id)} 
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in the {selectedCategory} category</p>
      )}
    </div>
  );
};

export default Collections;
