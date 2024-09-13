import React, { useState } from 'react'
import './style.scss' // Import the SCSS file
// import { TextField, MenuItem } from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface Transaction {
  type: string
  asset: string
  amount: string
  currentValue: string
  pl: string
  portfolio: string
  date: string
}

const transactionsData: Transaction[] = [
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  {
    type: 'Sent',
    asset: '-0.3137 LTC',
    amount: '€18.29',
    currentValue: '€18.25',
    pl: '€0.02 (-0.1%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-21',
  },
  {
    type: 'Received',
    asset: '0.2755 LTC',
    amount: '€16.07',
    currentValue: '€16.03',
    pl: '€0.04 (-0.22%)',
    portfolio: 'Bybit Exchange',
    date: '2024-08-20',
  },
  {
    type: 'Sent',
    asset: '-221.99 TRX',
    amount: '€26.96',
    currentValue: '€31.39',
    pl: '€5.64 (-20.92%)',
    portfolio: 'Bybit Exchange',
    date: '2024-07-22',
  },
  // Add more transaction objects as needed
]

const TransactionsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [transactionType, setTransactionType] = useState<string>('')

  //   const handleDateChange = (date: Date | null) => {
  //     setSelectedDate(date)
  //   }

  return (
    <div className="transactions-page">
      <header className="header">
        <h1>Transactions</h1>
        <div className="actions">
          <button className="btn">Earn</button>
          <button className="btn">Buy Crypto</button>
          <button className="btn swap">Swap</button>
        </div>
      </header>

      {/* <div className="filters">
        <TextField label="Search" variant="outlined" className="search" />
        <TextField
          select
          label="Transaction type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="transaction-type">
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Sent">Sent</MenuItem>
          <MenuItem value="Received">Received</MenuItem>
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            slotProps={{
              textField: { className: 'date-picker' }, // Direct TextField props
            }}
          />
        </LocalizationProvider>
      </div> */}

      <div className="transactions-header">
        <span className="header-type">Type</span>
        <span className="header-asset">Asset(s)</span>
        <span className="header-value">Current Value</span>
        <span className="header-pl">P/L</span>
        <span className="header-portfolio">Portfolio</span>
      </div>
      <div className="transactions-list">
        {transactionsData
          //   .filter(
          //     (transaction) =>
          //       (!transactionType || transaction.type === transactionType) &&
          //       (!selectedDate ||
          //         new Date(transaction.date).toDateString() ===
          //           selectedDate?.toDateString()),
          //   )
          .map((transaction, index) => (
            <div className="transaction" key={index}>
              <div className="transaction-header">
                <span className="date">
                  {new Date(transaction.date).toDateString()}
                </span>
              </div>
              <div className="transaction-body">
                <div className={`type ${transaction.type.toLowerCase()}`}>
                  {transaction.type}
                </div>
                <div className="asset">{transaction.asset}</div>
                <div className="current-value">{transaction.currentValue}</div>
                <div className="pl">{transaction.pl}</div>
                <div className="portfolio">{transaction.portfolio}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TransactionsPage
