import {fetchTopMovers, fetchCryptoNews} from "../services/coinGeckoService.js";

/**
 * Controller to get the top cryptocurrencies.
 * @async
 * @function getTopMovers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON response with the top movers or an error message if fetching fails.
 * @throws {Error} If there is an issue fetching the top movers data, it responds with a 500 status code.
 */
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

/**
 * Controller to get the latest cryptocurrency news.
 * @async
 * @function getCryptoNews
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON response with the latest crypto news or an error message if fetching fails.
 * @throws {Error} If there is an issue fetching the crypto news, it responds with a 500 status code.
 */
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
