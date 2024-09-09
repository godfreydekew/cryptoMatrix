import React, { useEffect, useState } from 'react';
import { getCryptoBalance } from '../services/apiService.js';

const BalancePage = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const data = await getCryptoBalance();
            setBalance(data);
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <h1>Your Cryptocurrency Balance</h1>
            {balance ? (
                <div>
                    <p>Currency: {balance.currency}</p>
                    <p>Balance: {balance.balance}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BalancePage;
