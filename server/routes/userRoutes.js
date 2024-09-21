//routes/userRoutes
import express from 'express';
import { registerUser, loginUser, logoutUser, updateApiKey, getApiKeys, requestPasswordReset, resetPassword } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';  // Auth middleware

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', logoutUser);

router.post('/request-password-reset', requestPasswordReset);

// Reset password route
router.post('/reset-password', resetPassword);

// Update API key route
router.put('/update-api', isAuthenticated, updateApiKey);

router.get('/api-keys', isAuthenticated, getApiKeys);
// Check session route (newly added)
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

export default router;
