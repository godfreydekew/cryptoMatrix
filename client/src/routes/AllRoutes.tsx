import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/Landing/LandingPage'
import DashBoard from '../components/Dashboard'
import BybitApiSync from '../components/bybitConnect'
import TransactionsPage from '../components/Transactions'
import Layout from '../components/Layout'

const LayoutWrapper = ({ element }: any) => {
  return <Layout>{element}</Layout>
}

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route for LandingPage without Layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/connect" element={<BybitApiSync />} />

        {/* Layout wrapper for other routes */}
        <Route
          path="/dashboard"
          element={<LayoutWrapper element={<DashBoard />} />}
        />
        <Route
          path="/dashboard/transactions"
          element={<LayoutWrapper element={<TransactionsPage />} />}
        />
      </Routes>
    </Router>
  )
}

export default AllRoutes
