//config/bybit.js
import 'dotenv/config';
import { RestClientV5 } from "bybit-api";

const DEFAULT_API_KEY = process.env.API_KEY;
const DEFAULT_API_SECRET = process.env.API_SECRET;
const USE_TESTNET = process.env.USE_TESTNET === 'TRUE';

/**
 * Function to create a Bybit client with either user-specific or default API keys.
 * @param {string} [apiKey] - User-specific API key (optional).
 * @param {string} [apiSecret] - User-specific API secret (optional).
 * @returns {RestClientV5} - Instance of the Bybit client.
 */
const createBybitClient = (apiKey, apiSecret) => {
    console.log('Called');
    console.log(apiKey);
    return new RestClientV5({
        key: apiKey || DEFAULT_API_KEY,
        secret: apiSecret || DEFAULT_API_SECRET,
        testnet: USE_TESTNET
    });
};

export default createBybitClient;
