import React from 'react'
import Sidebar from '../SideBar/index' // Make sure to import your Sidebar component
import Navbar from '../Navbar'
import './layout.scss'
// import InnerNav from '../Navbar/InnerNav'

const Layout = ({ children }: any) => {
  return (
    <div style={{ display: 'flex' }} className="layout">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {/* <InnerNav /> */}

        {/* Page Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
