import { getAllAssetsWithPrice, getBalancesAndCalculateTotal, fetchAllTransactions } from '../services/bybitService.js';
import getBalance from '../services/allAssets.js';

// Controller to get total balance in USD
const getTotalBalance = async (req, res) => {
    try {
        const totalUSD = await getBalancesAndCalculateTotal();
        console.log(totalUSD);
        return res.json({ totalBalanceInUSD: totalUSD });
    } catch (error) {
        console.error('Error fetching total balance:', error);
        res.status(500).json({ error: 'Error fetching total balance' });
    }
};

// Controller to get all transactions in the last 100 days
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await fetchAllTransactions();
        res.json({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

// Controller to get assets with price
const fetchAllAssets= async (req, res) => {
    try {
        const assets = await getAllAssetsWithPrice();
        res.json({ assets });
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Error fetching assets' });
    }
};

export {
    fetchAllAssets,
    getTotalBalance,
    getAllTransactions
};
