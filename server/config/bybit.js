/**
 * bybit.js
 */
import { RestClientV5 } from "bybit-api";
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const USE_TESTNET = process.env.USE_TESTNET === 'TRUE';



// Test unauthenticated request


const bybitClient = new RestClientV5({
  key: API_KEY,
  secret: API_SECRET,
  testnet: USE_TESTNET
});

// client.getAllCoinsBalance({
//   accountType: 'FUND',
//   coin: 'USDT',
// })
// .then((response) => {
//   console.log("Full wallet balance:");
//   console.log(util.inspect(response, {showHidden: false, depth: null, colors: true}));
// })
// .catch((error) => {
//   console.error("Error:", error);
// });

export default bybitClient;
