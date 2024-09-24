//routes//bybitRoutes.js
import express from "express";
import {
  fetchAllAssets,
  getTotalBalance,
  getAllTransactions,
} from "../controllers/bybitController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

/**
 * Bybit routes.
 * 
 * These routes handle requests related to the Bybit API, including fetching 
 * total balance, recent transactions, and all assets with their prices.
 * All routes are protected and require user authentication.
 * 
 * @module routes/bybitRoutes
 * @requires express
 * @requires ../controllers/bybitController
 * @requires ../middleware/auth
 */


// Middleware to ensure the user is authenticated before accessing any route.
router.use(isAuthenticated);

/**
 * GET /total_balance
 * 
 * Route to fetch the user's total balance in USD from the Bybit API.
 * 
 * @name GetTotalBalance
 * @route {GET} /total_balance
 * @authentication This route requires the user to be authenticated.
 */
router.get("/total_balance", getTotalBalance);

/**
 * GET /transactions
 * 
 * Route to fetch the user's transactions from the Bybit API 
 * 
 * @name GetAllTransactions
 * @route {GET} /transactions
 * @authentication This route requires the user to be authenticated.
 */
router.get("/transactions", getAllTransactions);

/**
 * GET /assets
 * 
 * Route to fetch all assets with their current prices from the Bybit API.
 * 
 * @name FetchAllAssets
 * @route {GET} /assets
 * @authentication This route requires the user to be authenticated.
 */
router.get("/assets", fetchAllAssets);

export default router;
