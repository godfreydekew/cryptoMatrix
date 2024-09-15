// src/api/api.js
import axios from 'axios'

// const BASE_URL = 'https://74ce-78-135-2-38.ngrok-free.app/'
const BASE_URL = 'http://13.60.197.156:3000/'

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

    const response = await axios.post(`${BASE_URL}user/register`, payload)
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

    const response = await axios.post(`${BASE_URL}user/login`, payload)
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during registration:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}user/logout`)
    return response.data // handle the response accordingly
  } catch (error) {
    console.error('Error during logout:', error)
    throw error // rethrow the error to handle it in the calling component
  }
}
