const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cart: [cartItemSchema],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
