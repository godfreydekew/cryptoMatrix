// src/api/api.js
import axios from 'axios'

// Define the base URL for your API
const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Fetch users API call
export const fetchUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`)
  return data
}
