/**
 * bybitService.js
 * 
 * This module provides a set of services for interacting with the Bybit API.
 * It includes functions to retrieve balance, transactions, assets, and candlestick data
 * from the Bybit trading platform. These services utilize the Bybit API client configured 
 * in the `config/bybit.js` file.
 */
import axios from 'axios'; 
import bybitClient from '../config/bybit.js';
import getBalance from './allAssets.js';



// Function to convert coin balances to USD
const convertToUSD = async (coinSymbol, amount) => {
    try {
        // Request the price of the coin in USD from Coinbase
        const response = await axios.get(`https://api.coinbase.com/v2/prices/${coinSymbol}-USD/spot`);
        const priceInUSD = parseFloat(response.data.data.amount);
        const totalInUSD = priceInUSD * amount;
        return totalInUSD;
    } catch (error) {
        console.error(`Error converting ${coinSymbol} to USD:`, error);
        return 0;  // Return 0 if the API call fails for some reason
    }
};


// Function to calculate total balance in USD
const calculateTotalBalanceInUSD = async (balances) => {
    let totalBalanceInUSD = 0;
    // Iterate over each balance and convert to USD
    for (const balance of balances) {
        const coin = balance.coin;
        const walletBalance = parseFloat(balance.walletBalance);
        // Skip if walletBalance is zero
        if (walletBalance === 0) continue;
        // Convert coin balance to USD
        const valueInUSD = await convertToUSD(coin, walletBalance);
        totalBalanceInUSD += valueInUSD;
    }

    return totalBalanceInUSD;
};

// Get balances and calculate total balance in USD
const getBalancesAndCalculateTotal = async (coin = '') => {
    try {
        const balances = await getBalance('FUND', coin);
        const totalUSD = await calculateTotalBalanceInUSD(balances);
        console.log(`Total Balance in USD: $${totalUSD.toFixed(2)}`);
        return totalUSD;
    } catch (error) {
        console.error('Error calculating total balance in USD:', error);
        return -1;
    }
};

// Fetch balances and calculate total balance



//https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record

const getTransactions = async (startTime, endTime) => {
    try {
        const response = await bybitClient.getWithdrawalRecords({
            withdrawType: 2, // Adjust as needed
            limit: 100,  // Adjust limit if needed
            startTime: startTime,
            endTime: endTime
        });
        return response.result;
    } catch (error) {
        console.error('Error getting transactions:', error);
        throw error;
    } 
};


// const fetchAllTransactions = async () => {
//     let allTransfers = [];

//     // Query 1: 16th July to 15th August
//     let result1 = await getTransactions(new Date('2024-07-16').getTime(), new Date('2024-08-15').getTime());
//     allTransfers = allTransfers.concat(result1.rows);

//     // Query 2: 16th August to 21st August
//     let result2 = await getTransactions(new Date('2024-08-16').getTime(), new Date('2024-09-12').getTime());
//     allTransfers = allTransfers.concat(result2.rows);

//     return allTransfers;
// };

// fetchAllTransactions().then(transfers => {
//     console.log(transfers);  // This will log all the transactions within the time range
// }).catch(error => {
//     console.error('Error fetching all transactions:', error);
// });


// Service to get assets


// Helper function to get transactions for a specific date range
const fetchTransactionsInRange = async (startDate, endDate) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        console.error('Invalid date object:', { startDate, endDate });
        throw new Error('Invalid date object');
    }

    try {
        const result = await getTransactions(startDate.getTime(), endDate.getTime());
        return result.rows || [];
    } catch (error) {
        console.error(`Error fetching transactions from ${startDate} to ${endDate}:`, error);
        throw error;
    }
};

// Fetch transactions for the last 100 days in chunks of 25 days
const fetchAllTransactions = async () => {
    let allTransfers = [];
    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // 1 day before current date
    let startDate = new Date(endDate.getTime() - (100 * 24 * 60 * 60 * 1000)); // 100 days before end date

    for (let i = 0; i < 4; i++) {
        const rangeEndDate = new Date(startDate.getTime() + (25 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000)); // End of range - 1 day
        const transactions = await fetchTransactionsInRange(startDate, rangeEndDate);
        allTransfers = allTransfers.concat(transactions);
        startDate = new Date(rangeEndDate.getTime() + (24 * 60 * 60 * 1000)); // Move to the next range
    }

    return allTransfers;
};


export {
    getBalancesAndCalculateTotal,
    fetchAllTransactions
};

























