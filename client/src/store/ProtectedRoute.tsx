import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Redirect to landing page if not authenticated
    return <Navigate to="/" />
  }

  // If authenticated, render the child component
  return children
}

export default ProtectedRoute
