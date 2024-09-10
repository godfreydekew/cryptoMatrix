import bybitClient from '../config/bybit.js';
import { getBalancesAndCalculateTotal } from './bybitService.js';

//https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
const getBalance = async (accountType = 'FUND', coin = '') => {
    try {
      const response = await bybitClient.getAllCoinsBalance({ accountType, coin });
      return response.result.balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
};

console.log(await getBalance());
export default getBalance;