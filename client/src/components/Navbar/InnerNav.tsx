// import React, { useState } from 'react'
// import { FaBars } from 'react-icons/fa' // Menu icon
// import SideBar from '../SideBar'
// import './styles.scss'

// const InnerNav = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen) // Toggle the sidebar state
//   }

//   return (
//     <div className="navbar-inner">
//       <div className="logo"></div>
//       <div className="menu-icon" onClick={toggleSidebar}>
//         <FaBars size={24} />
//       </div>

//       {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
//       <SideBar isOpen={sidebarOpen} onClose={toggleSidebar} />
//     </div>
//   )
// }

// export default InnerNav
