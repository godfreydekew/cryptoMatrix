import React, { useState, useEffect } from "react";
import TradingViewWidget from "react-tradingview-widget";
import "./style.scss";

const ChartsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="charts-page">
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading chart...</p>
        </div>
      ) : (
        <div className="chart-container">
          <TradingViewWidget
            symbol="BTCUSDT"
            interval="1D"
            theme="dark"
            locale="en"
            autosize
            toolbar={true}
          />
        </div>
      )}
    </div>
  );
};

export default ChartsPage;