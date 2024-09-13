//controllers/bybitControllers.js
import { getAllAssetsWithPrice, getBalancesAndCalculateTotal, fetchAllTransactions } from '../services/bybitService.js';


// Controller to get total balance in USD
const getTotalBalance = async (req, res) => {

    try {
        const { apiKey, secretKey } = req.session;
        console.log(apiKey);
        if (!apiKey || !secretKey) {
            throw new Error('API keys not found in session');
        }
        const totalUSD = await getBalancesAndCalculateTotal(apiKey, secretKey);
        console.log(totalUSD);
        return res.json({ totalBalanceInUSD: totalUSD });
    } catch (error) {
        console.error('Error fetching total balance:in the server', error);
        res.status(500).json({error: error.message});
    }
};

// Controller to get all transactions in the last 100 days
const getAllTransactions = async (req, res) => {
    try {
        const { apiKey, secretKey } = req.session;
        
        if (!apiKey || !secretKey) {
            throw new Error('API keys not found in session');
        }
        const transactions = await fetchAllTransactions(apiKey, secretKey);
        res.json({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({error: error.message});
    }
};

// Controller to get assets with price
const fetchAllAssets= async (req, res) => {
    try {
        const { apiKey, secretKey } = req.session;
        if (!apiKey || !secretKey) {
            throw new Error('API keys not found in session');
        }
        const assets = await getAllAssetsWithPrice(apiKey, secretKey);
        res.json({ assets });
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({error: error.message});
    }
};

export {
    fetchAllAssets,
    getTotalBalance,
    getAllTransactions
};
