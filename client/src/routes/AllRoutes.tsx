// src/routes/AllRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import React from 'react'
import DashBoard from '../components/Dashboard'

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  )
}

export default AllRoutes
