import React from 'react'
import Sidebar from '../SideBar/index' // Make sure to import your Sidebar component
import Navbar from '../Navbar'

const Layout = ({ children }: any) => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Page Content */}
        <div style={{ padding: '20px' }}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
