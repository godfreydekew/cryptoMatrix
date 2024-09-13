//routes//bybitRoutes.js
import express from 'express';
import { fetchAllAssets, getTotalBalance, getAllTransactions } from '../controllers/bybitController.js';
import { isAuthenticated } from '../middleware/auth.js'; 

const router = express.Router();

router.use(isAuthenticated);
// Route to get total balance in USD
router.get('/total_balance', getTotalBalance);

// Route to get all transactions in the last 100 days
router.get('/transactions', getAllTransactions);


// Route to get all assets with price
router.get('/assets', fetchAllAssets);

export default router;
