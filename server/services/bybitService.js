/**
 * bybitService.js
 * 
 * This module provides a set of services for interacting with the Bybit API.
 * It includes functions to retrieve balance, transactions, assets, and candlestick data
 * from the Bybit trading platform. These services utilize the Bybit API client configured 
 * in the `config/bybit.js` file.
 */

import axios from 'axios'; 
import createBybitClient from '../config/bybit.js'; 
import getBalance from './allAssets.js';

/**
 * Converts a specified coin balance to its equivalent value in USD.
 *
 * @param {string} coinSymbol - The symbol of the coin to convert (e.g., 'BTC').
 * @param {number} amount - The amount of the coin to convert.
 * @returns {Promise<number>} - The equivalent value in USD.
 * @throws {Error} Throws an error if there is an issue with the conversion process.
 */
const convertToUSD = async (coinSymbol, amount) => {
    try {
        // Request the price of the coin in USD from Coinbase
        const response = await axios.get(`https://api.coinbase.com/v2/prices/${coinSymbol}-USD/spot`);
        const priceInUSD = parseFloat(response.data.data.amount);
        const totalInUSD = priceInUSD * amount;
        return totalInUSD;
    } catch (error) {
        console.error(`Error converting ${coinSymbol} to USD:`, error);
        throw error;  
    }
};



//https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
/**
 * Fetches withdrawal transactions for a specified date range from the Bybit API.
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} secretKey - The API secret for authentication with the Bybit API.
 * @param {number} startTime - The start time for the transaction search (timestamp).
 * @param {number} endTime - The end time for the transaction search (timestamp).
 * @returns {Promise<Object>} - The withdrawal transaction records.
 * @throws {Error} Throws an error if the API response indicates a failure.
 */
const getTransactions = async (apiKey, secretKey, startTime, endTime) => {
    try {
        
        const bybitClient = createBybitClient(apiKey, secretKey);
        // console.log(bybitClient)
        const response = await bybitClient.getWithdrawalRecords({
            withdrawType: 2,
            limit: 20,  
            startTime: startTime,
            endTime: endTime
        });

        if (response.retMsg!== 'success') {
            console.error('Error getting transactions:', response.retMsg);
            throw new Error(response.retMsg); 
        }
        return response.result;
    } catch (error) {
        console.error('Error getting transactions:', error);
        throw error;
    } 
};


/**
 * Fetches deposit records for a specified date range from the Bybit API.
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} secretKey - The API secret for authentication with the Bybit API.
 * @param {number} startTime - The start time for the deposit record search (timestamp).
 * @param {number} endTime - The end time for the deposit record search (timestamp).
 * @returns {Promise<Object>} - The deposit transaction records.
 * @throws {Error} Throws an error if the API response indicates a failure.
 */
const getDepositRecords = async (apiKey, secretKey, startTime, endTime) => {
    try {
        const bybitClient = createBybitClient(apiKey, secretKey);
        const response = await bybitClient.getDepositRecords({
            coin: '',  
            startTime: startTime,
            endTime: endTime,
            limit: 20  
        });

        if (response.retMsg !== 'success') {
            console.error('Error getting deposit records:', response.retMsg);
            throw new Error(response.retMsg);  
        }
        return response.result;
    } catch (error) {
        console.error('Error getting deposit records:', error);
        throw error;
    }
};



// Helper function to get transactions for a specific date range
/**
 * Fetches transactions for a specific date range and enhances the transaction data.
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} secretKey - The API secret for authentication with the Bybit API.
 * @param {Date} startDate - The start date for fetching transactions.
 * @param {Date} endDate - The end date for fetching transactions.
 * @returns {Promise<Array>} - An array of transaction records.
 * @throws {Error} Throws an error if the date objects are invalid or if the fetch fails.
 */

const fetchTransactionsInRange = async (apiKey, secretKey, startDate, endDate) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        console.error('Invalid date object:', { startDate, endDate });
        throw new Error('Invalid date object');
    }

    try {
        const result = await getTransactions(apiKey, secretKey, startDate.getTime(), endDate.getTime());
        return result.rows || [];
    } catch (error) {
        console.error(`Error fetching transactions from ${startDate} to ${endDate}:`, error);
        throw error;
    }
};


/**
 * Fetches all transactions (withdrawals and deposits)
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} secretKey - The API secret for authentication with the Bybit API.
 * @returns {Promise<Object>} - An object containing arrays of withdrawal and deposit transactions.
 * @throws {Error} Throws an error if the fetch process encounters an issue.
 */
const fetchAllTransactions = async (apiKey, secretKey) => {
    try {
        const currentDate = new Date();
        const endDate = new Date(currentDate.getTime() - 1);
        let startDate = new Date(endDate.getTime() - (100 * 24 * 60 * 60 * 1000)); 

        let allWithdrawals = [];
        let allDeposits = [];

        // Helper function to handle transaction enhancement
        const enhanceTransactions = async (transactions, isWithdrawal) => {
            return Promise.all(transactions.map(async (transaction) => {
                const coin = transaction.coin;
                const amount = parseFloat(transaction.amount);
                const withdrawFee = isWithdrawal ? parseFloat(transaction.withdrawFee) : 0;
                const totalInUSD = await convertToUSD(coin, amount);
                const feeInUSD = isWithdrawal ? await convertToUSD(coin, withdrawFee) : 0;

                // Calculate duration in seconds and minutes
                const createTime = parseInt(transaction.createTime);
                const updateTime = parseInt(transaction.updateTime);
                const durationInSeconds = isWithdrawal ? (updateTime - createTime) / 1000 : 0;
                const durationInMinutes = isWithdrawal ? durationInSeconds / 60 : 0;

                return {
                    ...transaction,
                    totalInUSD,
                    feeInUSD: isWithdrawal ? feeInUSD : undefined,
                    durationInSeconds: isWithdrawal ? durationInSeconds : undefined,
                    durationInMinutes: isWithdrawal ? durationInMinutes : undefined
                };
            }));
        };

        for (let i = 0; i < 4; i++) {
            const rangeEndDate = new Date(startDate.getTime() + (25 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000));

            const [withdrawalTransactions, depositTransactions] = await Promise.all([
                fetchTransactionsInRange(apiKey, secretKey, startDate, rangeEndDate),
                getDepositRecords(apiKey, secretKey, startDate.getTime(), rangeEndDate.getTime())
            ]);

            const [enhancedWithdrawalTransactions, enhancedDepositTransactions] = await Promise.all([
                enhanceTransactions(withdrawalTransactions, true),
                enhanceTransactions(depositTransactions.rows, false)
            ]);

            allWithdrawals = allWithdrawals.concat(enhancedWithdrawalTransactions);
            allDeposits = allDeposits.concat(enhancedDepositTransactions);

            startDate = new Date(rangeEndDate.getTime() + (24 * 60 * 60 * 1000));
        }

        return {
            withdrawals: allWithdrawals,
            deposits: allDeposits
        };
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        throw error;
    }
};


/**
 * Retrieves all assets with their respective prices.
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} secretKey - The API secret for authentication with the Bybit API.
 * @returns {Promise<Array>} - An array of asset details with their prices.
 * @throws {Error} Throws an error if the retrieval process encounters an issue.
 */
const getAllAssetsWithPrice = async (apiKey, secretKey) => {
    try {
        const balances = await getBalance(apiKey, secretKey); 
        const assetDetails = await Promise.all(balances.map(async (balance) => {
            const coin = balance.coin;
            const walletBalance = parseFloat(balance.walletBalance);

            
            if (walletBalance === 0) {
                return null;
            }

            const priceInUSD = await convertToUSD(coin, 1); 
            const amountInUSD = await convertToUSD(coin, walletBalance);

            return {
                coin,
                amount: walletBalance,
                priceInUSD,
                amountInUSD
            };
        }));

        return assetDetails.filter(asset => asset !== null);
    } catch (error) {
        console.error('Error retrieving all assets with price:', error);
        throw error;
    }
};


// Example usage of getAllAssetsWithPrice
/**
 * Retrieves balances of all assets and calculates the total balance in USD.
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} secretKey - The API secret for authentication with the Bybit API.
 * @returns {Promise<number>} - The total balance in USD.
 * @throws {Error} Throws an error if the retrieval process encounters an issue.
 */
const getBalancesAndCalculateTotal = async (apiKey, secretKey) => {
    try {
        const assets = await getAllAssetsWithPrice(apiKey, secretKey);
        const totalUSD = assets.reduce((acc, asset) => acc + asset.amountInUSD, 0);
        console.log(`Total Balance in USD: $${totalUSD.toFixed(2)}`);
        return totalUSD;
    } catch (error) {
        console.error('Error displaying total balance:', error);
        throw error;
    }
};

export {
    getAllAssetsWithPrice,
    getBalancesAndCalculateTotal,
    fetchAllTransactions
};

























