import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BalancePage from './pages/BalancePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BalancePage />} />
            </Routes>
        </Router>
    );
};

export default App;
