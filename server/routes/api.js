import express from 'express';

const router = express.Router();

// Mocked balance data
const getCryptoBalance = () => ({
    currency: 'BTC',
    balance: '0.456789'
});

// API route to get cryptocurrency balance
router.get('/balance', (req, res) => {
    const balance = getCryptoBalance();
    res.json(balance);
});

export default router;
