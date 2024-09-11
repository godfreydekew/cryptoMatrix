import getTopMovers  from '../controllers/coinGeckoController.js';
import express from 'express';

const router = express.Router();
router.get('/top-movers', getTopMovers);

export default router;