const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./Routes/products');
const userRoutes = require('./routes/signupRoutes');
const cors = require('cors');
const path = require('path');
const RunServer = require('./Database/connection')
const cartRoutes = require('./Routes/Cart')

const app = express();

app.use(express.json()); 
app.use(cors()); 

RunServer()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes); 

app.use('/user', userRoutes);

app.use('/api/cart',cartRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
