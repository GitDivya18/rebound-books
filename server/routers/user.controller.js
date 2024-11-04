const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const data = req.body;
    try {
        const userData = await User.findOne({ email: data.email });
        if (userData) {
            throw new Error('User Already Exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword
        });

        res.status(200).json({ success: true, message: 'User Created', newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist, return an error
        if (!user) {
            throw new Error('Invalid email or password');
        }
        res.status(200).json({ success, user })
    } catch (e) {
        res.status(500).send('Server Error')
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist, return an error
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return an error
        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with token
        res.status(200).json({ success: true, message: 'Login successful', token, user });
    } catch (error) {
        // Return error response
        res.status(401).json({ success: false, message: error.message });
    }
});

module.exports = router;
