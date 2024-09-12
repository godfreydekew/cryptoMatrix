import express from 'express';
import { registerUser, loginUser, logoutUser, updateApiKey } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';  // Auth middleware

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', logoutUser);

// Update API key route
router.put('/update-api', isAuthenticated, updateApiKey);

// Check session route (newly added)
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

export default router;
