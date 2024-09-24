//controllers/bybitControllers.js
import { getAllAssetsWithPrice, getBalancesAndCalculateTotal, fetchAllTransactions } from '../services/bybitService.js';


/**
 * Controller to get the total balance in USD.
 * 
 * This function retrieves the user's API keys from the session, calculates the 
 * total balance across all assets, and returns the balance in USD.
 * 
 * @async
 * @function getTotalBalance
 * @param {Object} req - Express request object.
 * @param {Object} req.session - Session object containing the user's API keys.
 * @param {Object} res - Express response object.
 * @returns {JSON} JSON response containing the total balance in USD.
 * @throws {Error} Throws an error if the API keys are not found in the session or if the balance cannot be fetched.
 */
const getTotalBalance = async (req, res) => {
    try {
        console.log('getTotalBalance session', req.session);
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


/**
 * Controller to get all transactions from the last 100 days.
 * 
 * This function retrieves the user's API keys from the session, fetches all 
 * transactions from Bybit for the last 100 days, and returns them.
 * 
 * @async
 * @function getAllTransactions
 * @param {Object} req - Express request object.
 * @param {Object} req.session - Session object containing the user's API keys.
 * @param {Object} res - Express response object.
 * @returns {JSON} JSON response containing the list of transactions.
 * @throws {Error} Throws an error if the API keys are not found in the session or if the transactions cannot be fetched.
 */
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


/**
 * Controller to get all assets with their prices.
 * 
 * This function retrieves the user's API keys from the session, fetches all 
 * assets and their current prices, and returns the result.
 * 
 * @async
 * @function fetchAllAssets
 * @param {Object} req - Express request object.
 * @param {Object} req.session - Session object containing the user's API keys.
 * @param {Object} res - Express response object.
 * @returns {JSON} JSON response containing the list of assets and their prices.
 * @throws {Error} Throws an error if the API keys are not found in the session or if the assets cannot be fetched.
 */
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
