import 'dotenv/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';


/**
 * Creates a MongoDB store for session storage using the `connect-mongo` package.
 * 
 * The store will use the `sessions` collection in the MongoDB database specified
 * by the `MONGO_URI` environment variable. Sessions have a time-to-live (TTL) of 
 * 14 days.
 * 
 * @constant {MongoStore} mongoStore - MongoDB-backed session store.
 */
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  ttl: 14 * 24 * 60 * 60 
});


/**
 * Middleware for handling session management in the Express app.
 * 
 * Sessions are stored in MongoDB using the `mongoStore` and configured to use
 * a secret from the `SESSION_SECRET` environment variable. Cookies are configured
 * to be secure, HTTP-only, and SameSite `None`, with a max age of 24 hours. The `domain`
 * and `path` properties are set for the specific backend.
 * 
 * @constant {Function} sessionMiddleware - Express session middleware.
 */
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none', 
      domain: 'cryptombackend.onrender.com', 
      path: '/' 
  }
});

export default sessionMiddleware;
