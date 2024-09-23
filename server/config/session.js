import 'dotenv/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Ensure MongoDB connection is established before using the session store
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI, 
  collectionName: 'sessions',
  ttl: 14 * 24 * 60 * 60 // Save session for 14 days
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // Set to false because it's local and not over HTTPS
      sameSite: 'lax', // Not cross-site
      path: '/' // Cookie is valid for the entire domain
  }
});

export default sessionMiddleware;
