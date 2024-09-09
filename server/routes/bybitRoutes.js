import express from 'express';
import { getBalanceForCoin, getTotalBalance, getAllTransactions } from '../controllers/bybitController.js';

const router = express.Router();

// Route to get balance for a specific coin or all coins
router.get('/balance/:coin?', getBalanceForCoin);  

// Route to get total balance in USD
router.get('/balance/total', getTotalBalance);

// Route to get all transactions in the last 100 days
router.get('/transactions', getAllTransactions);

export default router;
