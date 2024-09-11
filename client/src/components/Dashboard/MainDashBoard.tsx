import React from 'react'
import { SiBitcoinsv } from 'react-icons/si'

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
      </div>
    </div>
  )
}

export default MainDashBoard
