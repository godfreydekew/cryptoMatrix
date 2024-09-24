//server.js
/**
 * @module server
 * @description This module sets up an Express server for a cryptocurrency API, 
 *              handling user routes, Bybit trading API routes, 
 *              CoinGecko market data routes, and OpenAI chatbot integration.
 * 
 * The server is configured with CORS to allow cross-origin requests, 
 * uses body-parser to parse incoming request bodies, 
 * and establishes a session management system with MongoDB.
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


// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data

// MongoDB connection
connectDB();

// Use session middleware
app.use(sessionMiddleware);

// Routes
app.use("/user", userRoutes);
app.use("/bybit", bybitRoutes);
app.use("/movers", coinGeckoRoutes);
app.use("/chat", chartGptRouter); // OpenAI chatbot route


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
