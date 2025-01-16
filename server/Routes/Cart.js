const express = require('express')
const router = express.Router();
const User = require('../Model/signup')
const Product = require('../Model/product');

router.post('/add-to-cart', async (req, res) => {
    const { userId, productId, quantity } = req.body; 
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.error(`User not found with ID: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        console.error(`Product not found with ID: ${productId}`);
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const existingItem = user.cart.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
      console.error('Error in /add-to-cart route:', error);  
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  router.get('/get-cart/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('cart.productId'); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Cart fetched successfully', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.post('/remove-from-cart', async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      user.cart.splice(itemIndex, 1); // Remove the item from the cart
      await user.save();
  
      res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
      console.error('Error in /remove-from-cart route:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

module.exports = router;