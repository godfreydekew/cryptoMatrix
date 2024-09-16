//config/session.js
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: false,//put true when you deploy
        secure: process.env.NODE_ENV === 'production' // secure: true in production (HTTPS)
    }
});

export default sessionMiddleware;
