import React from 'react'
import { SiBitcoinsv } from 'react-icons/si'
import TopMoversTable from '../Table/TopMovers'

const MainDashBoard = () => {
  const coins = [
    {
      name: 'Bitcoin',
      amount: '$52,000',
      trend: '+20.21%',
      abb: 'BTC',
      logo: <SiBitcoinsv />,
    },
    {
      name: 'Bitcoin',
      amount: '$52,000',
      trend: '+20.21%',
      abb: 'BTC',
      logo: <SiBitcoinsv />,
    },
    {
      name: 'Bitcoin',
      amount: '$52,000',
      trend: '+20.21%',
      abb: 'BTC',
      logo: <SiBitcoinsv />,
    },
    {
      name: 'Bitcoin',
      amount: '$52,000',
      trend: '+20.21%',
      abb: 'BTC',
      logo: <SiBitcoinsv />,
    },
  ]
  return (
    <div className="pd_main_dashboard">
      <div className="db_body">
        <div className="db_row1">
          {coins.map((coin, i) => (
            <div className="card" key={i}>
              <div className="top_part">
                <div className="coin_logo">{coin.logo}</div>
                <div className="name_section">
                  <div className="text">
                    <p className="name">{coin.name}</p>
                    <p className="abb">{coin.abb}</p>
                  </div>
                </div>
              </div>
              <div className="bottom_part">
                <p className="price">{coin.amount}</p>
                <p className="trend">{coin.trend}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="db_row2">
          <div className="flex">
            <div className="left">
              <div className="credit_card">
                <div className="top">
                  <p>Credit Card</p>
                  <p>Card Icon</p>
                </div>
                <div className="middle">
                  <p>2345 1212 6787 5679</p>
                </div>
                <div className="bottom">
                  <p>Felicity Essien</p>
                  <p>VISA</p>
                </div>
              </div>
              <div className="potfolio">
                <h4>My Potfolio</h4>
                {coins.map((coin) => (
                  <div className="single_row">
                    <div className="flex">
                      <div className="top_part">
                        <div className="coin_logo">{coin.logo}</div>
                        <div className="name_section">
                          <div className="text">
                            <p className="name">{coin.name}</p>
                            <p className="abb">{coin.amount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <p>-13.5%</p>
                        <p>0.01234ETH</p>
                      </div>
                    </div>
                  </div>
                ))}
                {coins.map((coin) => (
                  <div className="single_row">
                    <div className="flex">
                      <div className="top_part">
                        <div className="coin_logo">{coin.logo}</div>
                        <div className="name_section">
                          <div className="text">
                            <p className="name">{coin.name}</p>
                            <p className="abb">{coin.amount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <p>-13.5%</p>
                        <p>0.01234ETH</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="right">
              <h3>Top Crypto Gainers And Losers Today </h3>
              <TopMoversTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainDashBoard
