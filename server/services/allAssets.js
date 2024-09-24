import createBybitClient from '../config/bybit.js';


//https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
/**
 * Fetches the balance of a specific coin or all coins in a given account type.
 *
 * This function creates a Bybit client and retrieves the balance information 
 * for the specified account type and coin. If no coin is specified, it fetches
 * the balance for all coins.
 *
 * @param {string} apiKey - The API key for authentication with the Bybit API.
 * @param {string} apiSecret - The API secret for authentication with the Bybit API.
 * @param {string} [accountType='FUND'] - The type of account to retrieve balances from. 
 *        Defaults to 'FUND'. Possible values are 'FUND' and 'MARGIN'.
 * @param {string} [coin=''] - The specific coin to get the balance for. If empty, 
 *        retrieves balances for all coins.
 * @returns {Promise<number>} - The balance of the specified coin, or all coins if no coin is specified.
 * @throws {Error} Throws an error if the API response indicates a failure or if there 
 *                 is an issue retrieving the balance.
 */
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