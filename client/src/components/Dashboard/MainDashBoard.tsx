import React, { useState, useEffect } from 'react';
import { SiBitcoinsv } from 'react-icons/si';
import TopMoversTable from '../Table/TopMovers';

const MainDashBoard = () => {
  const [coins, setCoins] = useState([]);
  const [balance, setBalance] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Fetch top movers data
    fetch('http://13.60.197.156:3000/movers/top-movers')
      .then(response => response.json())
      .then(data => {
        setCoins(data);
      })
      .catch(error => console.error('Error fetching top movers data:', error));

    // Fetch total balance data
    fetch('http://localhost:5000/bybit/total_balance')
      .then(response => response.json())
      .then(data => {
        setBalance(data);
      })
      .catch(error => console.error('Error fetching total balance data:', error));

    // Fetch assets data
    fetch('http://localhost:5000/bybit/assets')
      .then(response => response.json())
      .then(data => {
        setAssets(data.assets);
      })
      .catch(error => console.error('Error fetching assets data:', error));
  }, []);

  return (
    <div className="pd_main_dashboard">
      <div className="db_body">
        <div className="db_row1">
          {coins.slice(0, 4).map((coin, i) => (
            <div className="card" key={i}>
              <div className="top_part">
                <div className="coin_logo">
                  {/* Use the coin image from the API */}
                  <img src={coin.image} alt={`${coin.name} logo`} width="40" height="40" />
                </div>
                <div className="name_section">
                  <div className="text">
                    <p className="name">{coin.name}</p>
                    <p className="abb">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
              </div>
              <div className="bottom_part">
                {/* Display current price */}
                <p className="price">${coin.current_price.toLocaleString()}</p>
                {/* Display the 24h price change percentage */}
                <p className={`trend ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="db_row2">
          <div className="flex">
            <div className="left">
              <div className="credit_card">
                <div className="top">
                  <p>Total Balance</p>
                </div>
                <div className="middle">
                  <p>${balance ? balance.totalBalanceInUSD.toFixed(2) : 'Loading...'}</p>
                </div>
                <div className="bottom">
                  <p>{balance ? balance.name : 'Loading...'}</p>
                </div>
              </div>
              <div className="potfolio">
                <h4>My Portfolio</h4>
                {assets.map((asset, i) => (
                  <div className="single_row" key={i}>
                    <div className="flex">
                      <div className="top_part">
                        <div className="coin_logo">
                          {/* Placeholder for coin logo */}
                          <SiBitcoinsv size={40} />
                        </div>
                        <div className="name_section">
                          <div className="text">
                            <p className="name">{asset.coin}</p>
                            <p className="abb">{asset.amountInUSD.toFixed(2)} USD</p>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <p>{asset.priceInUSD.toFixed(2)} USD</p>
                        <p>{asset.amount.toFixed(4)} {asset.coin}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="right">
              <h3>Assets distributions</h3>
              <TopMoversTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashBoard;
