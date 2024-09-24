//routes/userRoutes
import express from 'express';
import { registerUser, loginUser, logoutUser, updateApiKey, getApiKeys, requestPasswordReset, resetPassword } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';  

const router = express.Router();
/**
 * User routes.
 * 
 * This module handles user-related routes for registration, authentication,
 * password management, and API key management.
 * 
 * @module routes/userRoutes
 * @requires express
 * @requires ../controllers/userController
 * @requires ../middleware/auth
 */


/**
 * POST /register
 * 
 * Route for registering a new user.
 * 
 * @name RegisterUser
 * @route {POST} /register
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.username - The username for the new user.
 * @param {string} req.body.email - The email for the new user.
 * @param {string} req.body.password - The password for the new user.
 * @param {string} req.body.apiKey - The bybit api
 * @param {string} req.body.apiSecret - The bybit secret key
 * @returns {Object} The response confirming the registration.
 */
router.post('/register', registerUser);


/**
 * POST /login
 * 
 * Route for logging in a user.
 * 
 * @name LoginUser
 * @route {POST} /login
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @returns {Object} The response confirming the login.
 */
router.post('/login', loginUser);

/**
 * POST /logout
 * 
 * Route for logging out a user.
 * 
 * @name LogoutUser
 * @route {POST} /logout
 * @returns {Object} The response confirming the logout.
 */
router.post('/logout', logoutUser);

/**
 * POST /request-password-reset
 * 
 * Route for requesting a password reset link.
 * 
 * @name RequestPasswordReset
 * @route {POST} /request-password-reset
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.email - The email of the user requesting the reset.
 * @returns {Object} The response confirming the request.
 */
router.post('/request-password-reset', requestPasswordReset);


/**
 * POST /reset-password
 * 
 * Route for resetting the user's password.
 * 
 * @name ResetPassword
 * @route {POST} /reset-password
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.token - The password reset token.
 * @param {string} req.body.newPassword - The new password for the user.
 * @returns {Object} The response confirming the password reset.
 */
router.post('/reset-password', resetPassword);


/**
 * PUT /update-api
 * 
 * Route for updating the user's API key. This route requires authentication.
 * 
 * @name UpdateApiKey
 * @route {PUT} /update-api
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.newApiKey - The new API key.
 * @returns {Object} The response confirming the API key update.
 * @authentication This route requires the user to be authenticated.
 */
router.put('/update-api', isAuthenticated, updateApiKey);



/**
 * GET /api-keys
 * 
 * Route for fetching the user's API keys. This route requires authentication.
 * 
 * @name GetApiKeys
 * @route {GET} /api-keys
 * @returns {Object} The response containing the user's API keys.
 * @authentication This route requires the user to be authenticated.
 */
router.get('/api-keys', isAuthenticated, getApiKeys);


/**
 * GET /check-session
 * 
 * Route for checking if a user is logged in based on session status.
 * 
 * @name CheckSession
 * @route {GET} /check-session
 * @returns {Object} The response indicating whether the user is logged in.
 */
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

export default router;
