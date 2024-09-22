import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

// Ensure MongoDB connection is established before using the session store
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI from Render
  collectionName: 'sessions',
  ttl: 14 * 24 * 60 * 60 // Save session for 14 days
});

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET, // Store a strong secret in Render's environment variables
    resave: false,
    saveUninitialized: false,
    store: mongoStore, // Use MongoStore to store sessions in MongoDB
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only set cookies over HTTPS in production
        sameSite: 'none' // Prevent CSRF by ensuring cookies are only sent on same-origin requests
    }
});

export default sessionMiddleware;
