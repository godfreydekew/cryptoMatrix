import React, { useState, useEffect } from 'react'
import { SiBitcoinsv } from 'react-icons/si'
import YourBarChartComponent from '../Table/TopMovers'
import { BASE_URL } from '../../api/api'
import { fetchTopMovers, fetchTotalBalance, fetchAssets } from '../../api/api'
import ChatbotAssistant from '../openAiChatbot'

interface Coin {
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
}

interface Balance {
  totalBalanceInUSD: number
  name: string
}

interface Asset {
  coin: string
  amountInUSD: number
  priceInUSD: number
  amount: number
}

const MainDashBoard = () => {
  const [coins, setCoins] = useState<Coin[]>([])
  const [balance, setBalance] = useState<Balance | null>(null)
  const [assets, setAssets] = useState<Asset[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top movers
        const topMoversData = await fetchTopMovers()
        console.log(topMoversData)
        setCoins(topMoversData)

        // Fetch total balance
        const balanceData = await fetchTotalBalance()
        setBalance(balanceData)

        // Fetch assets
        const assetsData = await fetchAssets()
        setAssets(assetsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="pd_main_dashboard">
      <div className="db_body">
        <div className="db_row1">
          {coins.slice(0, 4).map((coin, i) => (
            <div className="card" key={i}>
              <div className="top_part">
                <div className="coin_logo">
                  {/* Use the coin image from the API */}
                  <img
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    width="40"
                    height="40"
                  />
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
                <p
                  className={`trend ${
                    coin.price_change_percentage_24h >= 0
                      ? 'positive'
                      : 'negative'
                  }`}>
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
                  <p>
                    $
                    {balance
                      ? balance.totalBalanceInUSD.toFixed(2)
                      : 'Loading...'}
                  </p>
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
                        {/* <div className="coin_logo">
                          
                          <SiBitcoinsv size={40} />
                        </div> */}
                        <div className="name_section">
                          <div className="text">
                            <p className="name">{asset.coin}</p>
                            <p className="abb">
                              {asset.amountInUSD !== undefined
                                ? asset.amountInUSD.toFixed(2)
                                : 'N/A'}{' '}
                              USD
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <p>
                          {asset.priceInUSD !== undefined
                            ? asset.priceInUSD.toFixed(2)
                            : 'N/A'}{' '}
                          USD
                        </p>
                        <p>
                          {asset.amount !== undefined
                            ? asset.amount.toFixed(4)
                            : 'N/A'}{' '}
                          {asset.coin}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="right">
              <h3>Assets distributions</h3>
              <YourBarChartComponent />
              <ChatbotAssistant />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainDashBoard
