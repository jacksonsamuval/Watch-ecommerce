const User = require("../Model/signup");
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(200).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, userExists.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        return res.status(200).json({
            message: "Login Successful!",
            data: userExists,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
