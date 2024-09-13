import createBybitClient from '../config/bybit.js';


//https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
const getBalance = async (apiKey, apiSecret, accountType = 'FUND', coin = '') => {
    try {
      const bybitClient = createBybitClient(apiKey, apiSecret);
      const response = await bybitClient.getAllCoinsBalance({ accountType, coin });
      if (response.retMsg !== 'success') {
        console.error('Error getting balance:', response.retMsg);
        throw new Error(response.retMsg);  // Throw an error with the retMsg for easier debugging.
      } 
      return response.result.balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
};


export default getBalance;