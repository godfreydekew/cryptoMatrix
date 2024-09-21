import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import { BASE_URL } from '../../api/api'
import './style.scss'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Define the color map for the coins
const coinColors: { [key: string]: string } = {
  BTC: '#f69c3d',
  TRX: 'red',
  ETH: '#497493',
  VTC: '#205b30',
  DASH: '#1376b5',
  XMR: '#fc6621',
  ZEC: '#d38f36',
  BCC: '#f5922f',
  BTG: '#e8a629',
  MTL: '#c5b398',
  MCO: '#032144',
  OMG: '#2159ec',
  LTC: '#949494',
  XRP: '#1b95ca',
  STRAT: '#6bb3e0',
  XDN: '#507ba0',
  NEO: '#93cb30',
  DMD: '#a4cad9',
  ZEN: '#f38723',
  USDT: '#2ea07b',
  DEFAULT: '#808080',
}

// Define asset types
interface Asset {
  coin: string
  amountInUSD: number
}

interface ChartData {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    hoverOffset: number
    borderRadius: number // Added for rounded corners
    barPercentage: number // To control the width of bars
  }[]
}

const YourBarChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null)

  useEffect(() => {
    // Fetch assets from the API
    axios
      .get(`${BASE_URL}/bybit/assets`)
      .then((response) => {
        const assets: Asset[] = response.data.assets

        // Extract coin labels and amounts
        const labels = assets.map((asset) => asset.coin)
        const amountsInUSD = assets.map((asset) => asset.amountInUSD)

        // Map coin to its corresponding color or use default color
        const backgroundColor = assets.map(
          (asset) => coinColors[asset.coin] || coinColors.DEFAULT,
        )

        // Set the chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              data: amountsInUSD,
              backgroundColor: backgroundColor,
              hoverOffset: 10, // Smaller hover offset for bar charts
              borderRadius: 40, // Rounded corners for the bars
              barPercentage: 0.5, // Controls the bar width
            },
          ],
        })
      })
      .catch((error) => {
        console.error('Error fetching the asset data', error)
      })
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || ''
            const value = context.raw || 0
            return `${label}: $${value.toFixed(2)}` // Custom tooltip format
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip background color
        titleFont: { family: 'Arial', size: 20, weight: 'bold' }, // Customize tooltip title font
        bodyFont: { size: 20 }, // Customize tooltip body font
        padding: 10,
      },
      legend: {
        display: false, // No need for a legend in this case
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Coin',
          color: 'white',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        ticks: {
          color: 'white',
          weight: 'bold', // Change x-axis tick label color
          font: {
            size: 13, // Change x-axis tick label font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (USD)',
          color: 'white',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        beginAtZero: true, // Ensure the y-axis starts at 0
        ticks: {
          callback: (value: any) => `$${value}`, // Add $ symbol to y-axis values
          color: 'white', // Change y-axis tick label color
          font: {
            size: 15, // Change y-axis tick label fo
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic',
    },
  }

  return (
    <div className="chart-container">
      {chartData ? (
        // @ts-ignore
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  )
}

export default YourBarChartComponent
