import React from 'react'
import AllRoutes from './routes/AllRoutes'
import './App.css'
import LandingPage from './components/Landing/LandingPage'
// import './assets/styles/_index.scss' // Importing the SCSS file

function App() {
  return (
    <div className="main_container">
      {/* <LandingPage /> */}
      <AllRoutes />
    </div>
  )
}

export default App
