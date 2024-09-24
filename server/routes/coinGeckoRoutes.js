import {getTopMovers, getCryptoNews}  from '../controllers/coinGeckoController.js';
import express from 'express';

const router = express.Router();
/**
 * CoinGecko routes.
 * 
 * These routes handle requests to fetch the top movers (cryptocurrencies with the highest 
 * price changes) and the latest crypto-related news.
 * 
 * @module routes/coinGeckoRoutes
 * @requires express
 * @requires ../controllers/coinGeckoController
 */


/**
 * GET /top-movers
 * 
 * Route to fetch the top movers from the CoinGecko API. 
 * Top movers are cryptocurrencies with significant price changes.
 * 
 * @name GetTopMovers
 * @route {GET} /top-movers
 */
router.get('/top-movers', getTopMovers);


/**
 * GET /crypto-news
 * 
 * Route to fetch the latest cryptocurrency news from external sources using the CoinGecko API.
 * 
 * @name GetCryptoNews
 * @route {GET} /crypto-news
 */
router.get('/crypto-news', getCryptoNews);

export default router;