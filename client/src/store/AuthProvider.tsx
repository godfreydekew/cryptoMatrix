import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../api/api'

// Define the context
const AuthContext = createContext<any>(null)

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check session validity on mount
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/check-session`, {
          withCredentials: true, // Include cookies with the request
        })
        setIsAuthenticated(response.data.isLoggedIn)
      } catch (error) {
        console.error('Session check failed:', error)
        setIsAuthenticated(false)
      }
    }

    checkSession()
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    navigate('/dashboard') // Redirect to dashboard after login
  }

  const logout = async () => {
    await axios.post(`${BASE_URL}/user/logout`, {}, {
      withCredentials: true, // Include cookies with the request
    })
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
