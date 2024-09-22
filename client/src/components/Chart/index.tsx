import React, { useState, useEffect } from "react";
import TradingViewWidget from "react-tradingview-widget"; // Make sure this package has TypeScript support
import "./style.scss";

const ChartsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
            interval="D"
            theme="Dark"
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
