import {fetchTopMovers, fetchCryptoNews} from "../services/coinGeckoService.js";

// Controller to get the top movers
const getTopMovers = async (req, res) => {
    try {
        console.log("controller");
        const topMovers = await fetchTopMovers();
        res.json( topMovers );
    } catch (error) {
        console.error('Error fetching top movers:', error);
        res.status(500).json({ error: 'Error fetching top movers' });
    }
};

const getCryptoNews = async (req, res) => {
    try {
        const news = await fetchCryptoNews();
        res.json({ news });
    } catch (error) {
        console.error('Error fetching crypto news:', error);
        res.status(500).json({ error: 'Error fetching crypto news' });
    }
};

export {
    getTopMovers,
    getCryptoNews
};
