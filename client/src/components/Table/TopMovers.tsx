import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import axios from 'axios'
import { FaBitcoin } from 'react-icons/fa'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { BASE_URL } from '../../api/api'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels)

// Define the color map for the coins
const coinColors: { [key: string]: string } = {
  BTC: '#f69c3d',
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
  }[]
}

const YourChartComponent: React.FC = () => {
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
              hoverOffset: 100,
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
    cutout: '70%',
    radius: '50%',
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
        titleFont: { family: 'Arial', size: 14, weight: 'bold' }, // Customize tooltip title font
        bodyFont: { size: 25 }, // Customize tooltip body font
        padding: 10,
      },
      legend: {
        position: 'top' as const,
      },
      datalabels: {
        color: 'black', // Text color
        formatter: (value: number, context: any) => {
          return context.chart.data.labels[context.dataIndex] // Show the label (e.g., BTC, LTC)
        },
        font: {
          weight: 'bold', // Bold text
        },
        anchor: 'center' as const, // Position the text in the center of the arc
        align: 'center' as const, // Center the text within the arc
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
      },
      hover: {
        mode: 'nearest' as const,
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    },
  }

  return (
    <div className="chart-container">
      {chartData ? (
        // @ts-ignore
        <Doughnut data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  )
}

export default YourChartComponent
