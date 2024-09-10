import { getBalancesAndCalculateTotal, fetchAllTransactions } from '../services/bybitService.js';
import getBalance from '../services/allAssets.js';

// Controller to get balance for a specific coin
const getBalanceForCoin = async (req, res) => {
    const coin = req.params.coin;  // Coin passed in the URL, or empty for all coins
    if (!coin) { return res.status(500).json({error: 'Missing coin in the request paramaters'}); }
    try {
        const totalUSD = await getBalancesAndCalculateTotal(coin);
        console.log(totalUSD);
        if (totalUSD > 0) {
            res.json({ coin, totalBalanceInUSD: totalUSD });
        } else {
            res.status(404).json({ error: `No balance found for ${coin}` });
        }
        
    } catch (error) {
        console.error('Error fetching total balance:', error);
        res.status(500).json({ error: `Error fetching balance for${coin}` });
    }
};

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

export {
    getBalanceForCoin,
    getTotalBalance,
    getAllTransactions
};
