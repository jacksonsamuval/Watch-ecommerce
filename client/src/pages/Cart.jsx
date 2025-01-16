import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Cart.css"

const Cart = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('id'); 
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        console.log('User not logged in');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/get-cart/${userId}`);
        setCart(response.data.cart);
        calculateTotalPrice(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const removeFromCart = async (productId) => {
    if (!userId) {
      console.log('User not logged in');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/remove-from-cart', {
        userId,
        productId,
      });

      const updatedCart = cart.filter(item => item.productId._id !== productId);
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout');
  };

  return (
    <div className="product-list">
      <h1>Cart</h1>
      <div className="cart-summary">
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button> <br/>
          </div> <br/>
      {cart.length > 0 ? (
        <>
          <div className="product-grid">
            {cart.map(item => (
              <div key={item.productId._id} className="product-card">
                <img
                  src={`http://localhost:5000${item.productId.image}`}  
                  alt={item.productId.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h2>{item.productId.name}</h2>
                  <p className="product-description">{item.productId.description}</p>
                  <p className="product-price">${item.productId.price}</p>
                  <p className="product-category">{item.productId.category}</p>
                  <p className="product-stock">Stock: {item.productId.stock}</p>
                  <p className="product-quantity">Quantity: {item.quantity}</p> <br/>
                  <button 
                    className="remove-button" 
                    onClick={() => removeFromCart(item.productId._id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
