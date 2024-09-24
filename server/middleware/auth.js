//middleware/auth.js
/**
 * Middleware to check if a user is authenticated.
 * 
 * This middleware verifies if the user is logged in by checking the presence 
 * of `userId` in the session. If the user is authenticated, it passes control 
 * to the next middleware or route handler. If not, it returns a 401 Unauthorized 
 * status with an error message.
 * 
 * @function isAuthenticated
 * @param {Object} req - Express request object.
 * @param {Object} req.session - Session object containing the user's session data.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {JSON} If not authenticated, returns a 401 status and an error message. Otherwise, proceeds to the next middleware.
 */
const isAuthenticated = (req, res, next) => {
    console.log('inside auth', req.session);
    if (req.session.userId) {
        next();
    } else {
        return res.status(401).json({ error: 'You must be logged in to access this resource' });
    }
};

export { isAuthenticated };
