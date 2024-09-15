import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// Define the context
const AuthContext = createContext<any>(null)

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if the user is logged in from localStorage/sessionStorage
    return !!localStorage.getItem('authToken')
  })
  const navigate = useNavigate()

  const login = (token: string) => {
    // Save token to localStorage or sessionStorage
    localStorage.setItem('authToken', token)
    setIsAuthenticated(true)
    navigate('/dashboard') // Redirect to dashboard after login
  }

  const logout = () => {
    localStorage.removeItem('authToken') // Clear the token
    setIsAuthenticated(false)
    navigate('/') // Redirect to landing page after logout
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
