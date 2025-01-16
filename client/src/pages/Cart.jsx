import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('id'); // Get user ID from localStorage

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        console.log('User not logged in');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/get-cart/${userId}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  return (
    <div className="product-list">
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <div className="product-grid">
          {cart.map(item => (
            <div key={item.productId._id} className="product-card">
              <img
                src={`http://localhost:5000${item.productId.image}`}  // Use item.productId to access product details
                alt={item.productId.name}
                className="product-image"
              />
              <div className="product-details">
                <h2>{item.productId.name}</h2> {/* Access the product details via item.productId */}
                <p className="product-description">{item.productId.description}</p>
                <p className="product-price">${item.productId.price}</p>
                <p className="product-category">{item.productId.category}</p>
                <p className="product-stock">Stock: {item.productId.stock}</p>
                <p className="product-quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
