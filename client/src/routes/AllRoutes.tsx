// src/routes/AllRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/LandingPage'
import React from 'react'

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default AllRoutes
