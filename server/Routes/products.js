const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../Model/product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

router.post('/add-product', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image
    });

    await newProduct.save();
    res.status(200).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

router.get('/get-products', async (req, res) => {
    try {
      const products = await Product.find(); 
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  });
  
  
  
module.exports = router;
