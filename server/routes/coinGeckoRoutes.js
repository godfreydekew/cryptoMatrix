import {getTopMovers, getCryptoNews}  from '../controllers/coinGeckoController.js';
import express from 'express';

const router = express.Router();
router.get('/top-movers', getTopMovers);
router.get('/crypto-news', getCryptoNews);

export default router;