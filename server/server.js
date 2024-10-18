/**
 * @module server
 * @description This module sets up an Express server for a cryptocurrency API, 
 *              handling user routes, Bybit trading API routes, 
 *              CoinGecko market data routes, and OpenAI chatbot integration.
 * 
 * The server is configured with CORS to allow cross-origin requests, 
 * uses body-parser to parse incoming request bodies, 
 * and establishes a session management system with MongoDB.
 * 
 * @requires dotenv/config
 * @requires express
 * @requires cors
 * @requires body-parser
 * @requires bybitRoutes
 * @requires coinGeckoRoutes
 * @requires userRoutes
 * @requires chartGptRouter
 * @requires sessionMiddleware
 * @requires connectDB
 * @requires path
 * @requires url
 * 
 * @constant {number} port - The port number the server will listen on, defaulting to 4000.
 * @constant {string[]} allowedOrigins - List of allowed origins for CORS configuration.
 * 
 * @function App - Initializes the Express server, applies middleware, 
 *                          sets up routes, and starts listening for incoming requests.
 * @returns {void}
 * 
 * @route {GET} / - Welcome message for the API.
 * @route {GET} /user - Routes related to user management (login, registration).
 * @route {GET} /bybit - Routes for Bybit trading API operations.
 * @route {GET} /movers - Routes for fetching market data from CoinGecko.
 * @route {GET} /chat - Route for OpenAI chatbot integration.
 * 
 * @middleware {cors} - Configured to handle CORS requests based on allowed origins.
 * @middleware {bodyParser.json} - Middleware to parse JSON request bodies.
 * @middleware {bodyParser.urlencoded} - Middleware to parse URL-encoded request bodies.
 * @middleware {sessionMiddleware} - Middleware for managing user sessions with MongoDB.
 * 
 * @example
 * // Start the server and listen on the specified port
 * app.listen(port, () => {
 *   console.log(`Server is running on port ${port}`);
 * });
 */
import 'dotenv/config';
import express from "express";
import cors from "cors"; 
import bodyParser from "body-parser"; 
import bybitRoutes from "./routes/bybitRoutes.js";
import coinGeckoRoutes from "./routes/coinGeckoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chartGptRouter from "./routes/openAI.js"
import sessionMiddleware from "./config/session.js"; 
import connectDB from "./config/db.js";
import { dirname, join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

const allowedOrigins = ['http://localhost:3000', 'https://cryptomfrontend.onrender.com'];

app.set("trust proxy", 1);

app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
  }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

connectDB();

app.use(sessionMiddleware);

app.use("/user", userRoutes);
app.use("/bybit", bybitRoutes);
app.use("/movers", coinGeckoRoutes);
app.use("/chat", chartGptRouter); 


app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

app.use((req, res) => {
  res.status(404).send("API route not found");
});


app.get("/", (req, res) => {
  res.send("Welcome to the cryptocurrency API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
