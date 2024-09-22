// @ts-ignore
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/Landing/LandingPage'
import DashBoard from '../components/Dashboard'
import BybitApiSync from '../components/bybitConnect'
import TransactionsPage from '../components/Transactions'
import Layout from '../components/Layout'
import NewsPage from '../components/News'
import ChartsPage from '../components/Chart'
import { AuthProvider } from '../store/AuthProvider' // Import AuthProvider
import ProtectedRoute from '../store/ProtectedRoute' // Import ProtectedRoute
import ConfirmPassword from '../components/Auth/ConfirmPssword'

const LayoutWrapper = ({ element }: any) => {
  return <Layout>{element}</Layout>
}

const AllRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/connect" element={<BybitApiSync />} />
          <Route path="/reset-password" element={<ConfirmPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <LayoutWrapper element={<DashBoard />} />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/transactions"
            element={
              // <ProtectedRoute>
              <LayoutWrapper element={<TransactionsPage />} />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/news"
            element={<LayoutWrapper element={<NewsPage />} />}
          />
          <Route
            path="/chart"
            element={<LayoutWrapper element={<ChartsPage />} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AllRoutes
