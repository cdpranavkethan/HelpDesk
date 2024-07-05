const User = require('../models/userAuth.model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password ,email } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: `Account with ${email} already exists` });
        }

        // Create new user
        const newUser = new User({ username:username,password: password ,email:email});
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username exists and password matches
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const role=user.role
        // Generating JWT token
        const token = jwt.sign({ username }, "Secret JWT key");

        return res.status(200).json({ message: 'Login successful', token ,role});
    } catch (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try{
        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Error logging out:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
