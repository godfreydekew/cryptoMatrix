import fetchTopMovers from "../services/coinGeckoService.js";

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

export default getTopMovers;
