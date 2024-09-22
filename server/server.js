//server.js
import express from "express";
import cors from "cors"; // Import CORS for handling cross-origin requests
import bodyParser from "body-parser"; // Import body-parser for parsing JSON
import dotenv from "dotenv";
import bybitRoutes from "./routes/bybitRoutes.js";
import coinGeckoRoutes from "./routes/coinGeckoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chartGptRouter from "./routes/openAI.js"
import sessionMiddleware from "./config/session.js"; // MongoDB-based session
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: 'https://cryptomfrontend.onrender.com', // Allow only this origin (your frontend)
    credentials: true, // Allow cookies to be sent with the request
  };
  
  app.use(cors(corsOptions)); //

// const allowedOrigins = ['http://localhost:4000', 'https://08de-78-135-2-38.ngrok-free.app'];

// // Enable CORS for all routes
// app.use(cors({
//     origin: function(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     credentials: true
//   }));

//   app.options('*', cors({
//   origin: function(origin, callback) {
//     console.log('Preflight request origin:', origin); // Log the origin for preflight requests
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   credentials: true
// }));

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

app.get("/", (req, res) => {
  res.send("Welcome to the cryptocurrency API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
