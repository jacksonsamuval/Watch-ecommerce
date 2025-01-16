const express = require('express')
const router = express.Router();
const User = require('../Model/signup')

router.post('/add-to-cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    if (!email || !productId || !quantity) {
      return res.status(400).json({ message: 'Please provide email, productId, and quantity' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const product = await Product.findById(productId);
      if (!product) {
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
      res.status(500).json({ message: 'Server error', error });
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
  

module.exports = router;