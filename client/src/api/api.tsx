// src/api/api.js
import axios from 'axios'

export const BASE_URL = 'https://cryptombackend.onrender.com'
// export const BASE_URL = 'http://localhots:4000';
axios.defaults.withCredentials = true
// axios.defaults.baseURL = BASE_URL;

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  apiKey: string,
  secretKey: string,
) => {
  try {
    const payload = {
      username,
      email,
      password,
      apiKey,
      secretKey,
    }

    const response = await axios.post(`${BASE_URL}/user/register`, payload, {
      withCredentials: true,
    })
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during registration:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const payload = {
      email,
      password,
    }

    const response = await axios.post(`${BASE_URL}/user/login`, payload, {
      withCredentials: true,
    })
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during registration:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}

export const resetPassword = async (email: string) => {
  try {
    const payload = {
      email,
    }

    const response = await axios.post(
      `${BASE_URL}/user/request-password-reset`,
      payload,
    )
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during registration:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}
export const confirmPassword = async (
  email: string,
  newPassword: string,
  recoveryCode: number,
) => {
  try {
    const payload = {
      recoveryCode,
      email,
      newPassword,
    }

    const response = await axios.post(
      `${BASE_URL}/user/reset-password`,
      payload,
      {
        withCredentials: true,
      },
    )
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during registration:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}

export const logout = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/logout`,
      {},
      {
        withCredentials: true,
      },
    )
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during logout:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}

// Fetch top movers
export const fetchTopMovers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movers/top-movers`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching top movers data:', error)
    throw error
  }
}

// Fetch total balance
export const fetchTotalBalance = async () => {
  try {
    console.log('balance')
    const response = await axios.get(`${BASE_URL}/bybit/total_balance`, {
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error('Error fetching total balance data:', error)
    throw error
  }
}

// Fetch assets
export const fetchAssets = async () => {
  try {
    console.log('ASSETS')
    const response = await axios.get(`${BASE_URL}/bybit/assets`, {
      withCredentials: true,
    })
    return response.data.assets
  } catch (error) {
    console.error('Error fetching assets data:', error)
    throw error
  }
}
