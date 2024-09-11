// src/components/LandingPage.jsx
import React from 'react'
import Users from './Users/users'

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page!</h1>
      <a href="/dashboard">My dashboard</a>
      <Users />
    </div>
  )
}

export default LandingPage
