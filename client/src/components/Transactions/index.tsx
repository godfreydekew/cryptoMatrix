import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss'; // Updated SCSS

interface Transaction {
  type: string;
  asset: string;
  amount: string;
  fees: string;
  durationInMinutes: string;
  date: string;
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/bybit/transactions'); // API endpoint
        const data = response.data;

        const transformedTransactions: Transaction[] = [
          ...data.transactions.withdrawals.map((item: any) => ({
            type: 'Sent',
            asset: `-${parseFloat(item.amount).toFixed(4)} ${item.coin}`,
            amount: `$${item.totalInUSD.toFixed(2)}`,
            fees: `$${(item.feeInUSD).toFixed(2)} (${((item.feeInUSD) / item.totalInUSD * 100).toFixed(2)}%)`,
            durationInMinutes: `${parseFloat(item.durationInMinutes).toFixed(2)}`,
            date: new Date(parseInt(item.createTime)).toLocaleDateString(),
          })),
          ...data.transactions.deposits.map((item: any) => ({
            type: 'Received',
            asset: `${item.amount} ${item.coin}`,
            amount: `$${item.totalInUSD.toFixed(2)}`,
            fees: '€0.00 (0.00%)',
            durationInMinutes: '00',
            date: new Date(parseInt(item.successAt)).toLocaleDateString(),
          })),
        ];

        setTransactions(transformedTransactions);
      } catch (error) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div className="transaction-row transaction-header">
          <div className="transaction-cell">Type</div>
          <div className="transaction-cell">Asset</div>
          <div className="transaction-cell">Amount</div>
          <div className="transaction-cell">Fees</div>
          <div className="transaction-cell">Duration (Minutes)</div>
          <div className="transaction-cell">Date</div>
        </div>
      </div>
      <div className="transactions-body">
        {transactions.map((transaction, index) => (
          <div className="transaction-row" key={index}>
            <div className={`transaction-cell ${transaction.type === 'Sent' ? 'sent' : 'received'}`}>
              {transaction.type}
            </div>
            <div className="transaction-cell">{transaction.asset}</div>
            <div className="transaction-cell">{transaction.amount}</div>
            <div className="transaction-cell">{transaction.fees}</div>
            <div className="transaction-cell">{transaction.durationInMinutes}</div>
            <div className="transaction-cell">{transaction.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
