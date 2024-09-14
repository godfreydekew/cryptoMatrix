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
        throw error;  
    }
};


// // Function to calculate total balance in USD
// const calculateTotalBalanceInUSD = async (balances) => {
//     let totalBalanceInUSD = 0;
//     // Iterate over each balance and convert to USD
//     for (const balance of balances) {
//         const coin = balance.coin;
//         const walletBalance = parseFloat(balance.walletBalance);
//         // Skip if walletBalance is zero
//         if (walletBalance === 0) continue;
//         // Convert coin balance to USD
//         const valueInUSD = await convertToUSD(coin, walletBalance);
//         totalBalanceInUSD += valueInUSD;
//     }

//     return totalBalanceInUSD;
// };

// // Get balances and calculate total balance in USD
// const getBalancesAndCalculateTotal = async (coin = '') => {
//     try {
//         const balances = await getBalance('FUND', coin);
//         const totalUSD = await calculateTotalBalanceInUSD(balances);
//         console.log(`Total Balance in USD: $${totalUSD.toFixed(2)}`);
//         return totalUSD;
//     } catch (error) {
//         console.error('Error calculating total balance in USD:', error);
//         return -1;
//     }
// };

// Fetch balances and calculate total balance



//https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record

const getTransactions = async (apiKey, secretKey, startTime, endTime) => {
    try {
        
        const bybitClient = createBybitClient(apiKey, secretKey);
        // console.log(bybitClient)
        const response = await bybitClient.getWithdrawalRecords({
            withdrawType: 2, // Adjust as needed
            limit: 20,  // Adjust limit if needed
            startTime: startTime,
            endTime: endTime
        });

        if (response.retMsg!== 'success') {
            console.error('Error getting transactions:', response.retMsg);
            throw new Error(response.retMsg);  // Throw an error with the retMsg for easier debugging.
        }
        return response.result;
    } catch (error) {
        console.error('Error getting transactions:', error);
        throw error;
    } 
};

const getDepositRecords = async (apiKey, secretKey, startTime, endTime) => {
    try {
        const bybitClient = createBybitClient(apiKey, secretKey);
        const response = await bybitClient.getDepositRecords({
            coin: '',  // Adjust this if you want to filter by specific coin
            startTime: startTime,
            endTime: endTime,
            limit: 20  // Adjust limit if needed
        });

        if (response.retMsg !== 'success') {
            console.error('Error getting deposit records:', response.retMsg);
            throw new Error(response.retMsg);  // Throw an error with the retMsg for easier debugging
        }
        return response.result;
    } catch (error) {
        console.error('Error getting deposit records:', error);
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


const fetchAllTransactions = async (apiKey, secretKey) => {
    try {
        const currentDate = new Date();
        const endDate = new Date(currentDate.getTime() - (5000)); // 1 day before current date
        let startDate = new Date(endDate.getTime() - (100 * 24 * 60 * 60 * 1000)); // 100 days before end date

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
            const rangeEndDate = new Date(startDate.getTime() + (25 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000)); // End of range - 1 day

            // Fetch withdrawal and deposit transactions in parallel
            const [withdrawalTransactions, depositTransactions] = await Promise.all([
                fetchTransactionsInRange(apiKey, secretKey, startDate, rangeEndDate),
                getDepositRecords(apiKey, secretKey, startDate.getTime(), rangeEndDate.getTime())
            ]);

            // Enhance transactions in parallel
            const [enhancedWithdrawalTransactions, enhancedDepositTransactions] = await Promise.all([
                enhanceTransactions(withdrawalTransactions, true),
                enhanceTransactions(depositTransactions.rows, false)
            ]);

            // Combine withdrawals and deposits
            allWithdrawals = allWithdrawals.concat(enhancedWithdrawalTransactions);
            allDeposits = allDeposits.concat(enhancedDepositTransactions);

            // Move to the next range
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


const getAllAssetsWithPrice = async (apiKey, secretKey) => {
    try {
        const balances = await getBalance(apiKey, secretKey); // Fetch all asset balances
        const assetDetails = await Promise.all(balances.map(async (balance) => {
            const coin = balance.coin;
            const walletBalance = parseFloat(balance.walletBalance);

            // Skip if walletBalance is zero
            if (walletBalance === 0) {
                return null;
            }

            // Get market price of the coin
            const priceInUSD = await convertToUSD(coin, 1); // Get price of 1 unit
            const amountInUSD = await convertToUSD(coin, walletBalance);

            return {
                coin,
                amount: walletBalance,
                priceInUSD,
                amountInUSD
            };
        }));

        // Filter out null values (where walletBalance was zero)
        return assetDetails.filter(asset => asset !== null);
    } catch (error) {
        console.error('Error retrieving all assets with price:', error);
        throw error;
    }
};

// Example usage of getAllAssetsWithPrice
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

























