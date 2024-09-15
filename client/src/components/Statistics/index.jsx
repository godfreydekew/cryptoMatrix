import React from 'react';
import { FaCoins, FaDollarSign, FaChartLine } from 'react-icons/fa';
import './style.scss';

const StatisticsCard = ({ title, value, icon }) => {
  return (
    <div className="statistics-card">
      <div className="icon">{icon}</div>
      <div className="details">
        <p className="title">{title}</p>
        <p className="value">{value}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
