import React, { useState } from 'react'
import './style.scss'
import { CgMenuGridR } from 'react-icons/cg'
import { IoPieChartOutline } from 'react-icons/io5'
import { GrTransaction } from 'react-icons/gr'
import { RiNewsLine } from 'react-icons/ri'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../api/api'
import { FaBars } from 'react-icons/fa' // Menu icon

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeLink, setActiveLink] = useState(location.pathname)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Track menu state

  const navLinks = [
    { name: 'Overview', icon: <CgMenuGridR />, link: '/dashboard' },
    { name: 'Chart', icon: <IoPieChartOutline />, link: '/chart' },
    {
      name: 'Transactions',
      icon: <GrTransaction />,
      link: '/dashboard/transactions',
    },
    { name: 'News', icon: <RiNewsLine />, link: '/news' },
  ]

  const handleLogout = async () => {
    try {
      const response = await logout()
      navigate('/')
      console.log('Logout successful:', response)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen) // Toggle menu open/close
  }

  const handleLinkClick = (link: any) => {
    setActiveLink(link)
    navigate(link)
    setIsMenuOpen(false) // Close menu after selecting link
  }

  return (
    <>
      {/* Menu icon for mobile view */}
      <div className="menu-icon" onClick={handleMenuClick}>
        <FaBars size={24} />
      </div>

      {/* Sidebar */}
      <div className={`pd_sidebar_wrapper ${isMenuOpen ? 'open' : ''}`}>
        <div className="inner_wrap">
          <div className="logo">
            <h2>CryptoMatrix</h2> {/* Logo on mobile screens */}
          </div>
          {navLinks.map((item, i) => (
            <div
              className={`nav_flex ${activeLink === item.link ? 'active' : ''}`}
              key={i}
              onClick={() => handleLinkClick(item.link)}>
              <div className="icon">{item.icon}</div>
              <p>{item.name}</p>
            </div>
          ))}
          <div className="nav_flex bottom" onClick={handleLogout}>
            <div className="icon">
              <BiLogOut />
            </div>
            <p>LogOut</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
