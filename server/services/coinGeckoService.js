import axios from 'axios';

/**
 * Fetches the top movers in the cryptocurrency market and returns filtered data.
 *
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing details of the top movers.
 * @throws {Error} Throws an error if there is an issue fetching the data from CoinGecko.
 */
const fetchTopMovers = async () => {
    try {
        console.log('Fetching Top Movers');
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10, 
                price_change_percentage: '24h'
            }
        });

        // Filter the data to only include relevant fields up to total supply
        return response.data.map((coin) => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            market_cap_rank: coin.market_cap_rank,
            total_volume: coin.total_volume,
            price_change_percentage_24h: coin.price_change_percentage_24h,
        }));
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
        throw new Error('Error fetching top movers');
    }
};


/**
 * Fetches the latest cryptocurrency news from CoinGecko.
 *
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of news objects.
 * @throws {Error} Throws an error if there is an issue fetching the news from CoinGecko.
 */
const fetchCryptoNews = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/news');
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching cryptocurrency news:', error);
        throw new Error('Error fetching cryptocurrency news');
    }
};


export {
    fetchTopMovers,
    fetchCryptoNews,
}
