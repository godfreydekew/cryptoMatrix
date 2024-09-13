//controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Signup controller
const registerUser = async (req, res) => {
    
    const { username, password, apiKey, secretKey } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ error: 'User already exists' });

        const user = await User.create({ username, password, apiKey, secretKey });

        // Store user info in session after registration
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.apiKey = user.apiKey;  // Store API key in session
        req.session.secretKey = user.secretKey;  // Store Secret key in session
        console.log('Session data:', req.session);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Login controller
const loginUser = async (req, res) => {

    console.log('Session data:', req.session);
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Store user info in session
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.apiKey = user.apiKey;  // Store API key in session
        req.session.secretKey = user.secretKey;  // Store Secret key in session

        res.json({ message: 'Logged in successfully', user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Logout controller
const logoutUser = (req, res) => {
    console.log('Session data:', req.session);

    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: 'Logged out successfully' });
    });
};

// Update API Key controller
const updateApiKey = async (req, res) => {
    // Check session data
    console.log('Session data:', req.session);

    const { userId } = req.session;
    if (!userId) {
        return res.status(401).json({ error: 'You must be logged in to update API keys' });
    }

    const { apiKey, secretKey } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.apiKey = apiKey;
        user.secretKey = secretKey;

        console.log('Updated API Key:', user.apiKey, 'Updated Secret Key:', user.secretKey);
        await user.save();
        req.session.apiKey = user.apiKey;  // Store API key in session
        req.session.secretKey = user.secretKey;  // Store Secret key in session
        res.json({ message: 'API keys updated successfully' });
        
    } catch (error) {
        console.error('Error updating API keys:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};


const getApiKeys = async (req, res) => {
    const { userId } = req.session;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ apiKey: user.apiKey, secretKey: user.secretKey });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export { registerUser, loginUser, logoutUser, updateApiKey, getApiKeys };
