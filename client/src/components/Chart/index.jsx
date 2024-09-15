import React from "react";
import TradingViewWidget from "react-tradingview-widget";
import "./style.scss";

const ChartsPage = () => {
  return (
    <div className="charts-page">
      {/* Full-screen TradingView Chart */}
      <div className="chart-container">
        <TradingViewWidget
          symbol="BTCUSDT" // Default symbol, you can change this to any desired default
          interval="1D"   // Default timeframe, you can adjust if needed
          theme="dark"    // You can set light or dark theme
          locale="en"
          autosize
          toolbar={true}       // Automatically adjusts the chart size
        />
      </div>
    </div>
  );
};

export default ChartsPage;
