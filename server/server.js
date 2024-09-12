import express from 'express';
import cors from 'cors';         // Import CORS for handling cross-origin requests
import bodyParser from 'body-parser';  // Import body-parser for parsing JSON
import dotenv from 'dotenv';
import bybitRoutes from './routes/bybitRoutes.js';
import coinGeckoRoutes from './routes/coinGeckoRoutes.js'
import userRoutes from './routes/userRoutes.js';
import session from 'express-session';
import store from './config/redis.js';
import connectDB from './config/db.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // To parse URL-encoded data
connectDB();

// Use the Bybit routes
app.use(
    session({
        store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

app.use('/user', userRoutes)
app.use('/bybit', bybitRoutes);

app.use('/movers', coinGeckoRoutes);
app.get('/', (req, res) =>{
    res.send('Welcome to the cryptocurrency API');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
