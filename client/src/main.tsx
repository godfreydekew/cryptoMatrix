// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
