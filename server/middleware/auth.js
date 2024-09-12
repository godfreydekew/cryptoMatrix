const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        return res.status(401).json({ error: 'You must be logged in to access this resource' });
    }
};

export { isAuthenticated };
