import React from 'react'
import './style.scss'
import { CgMenuGridR } from 'react-icons/cg'
import { IoPieChartOutline } from 'react-icons/io5'
import { IoWalletOutline } from 'react-icons/io5'
import { GrTransaction } from 'react-icons/gr'
import { RiNewsLine } from 'react-icons/ri'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../api/api'

const SideBar = () => {
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Overview', icon: <CgMenuGridR />, link: '/dashboard' },
    { name: 'Chart', icon: <IoPieChartOutline />, link: '/dashboard' },
    {
      name: 'Transactions',
      icon: <GrTransaction />,
      link: '/dashboard/transactions',
    },
    { name: 'Wallet', icon: <IoWalletOutline />, link: '/dashboard' },
    { name: 'News', icon: <RiNewsLine />, link: '/dashboard' },
  ]
  const handleLogout = async () => {
    try {
      const response = await logout()
      navigate('/')
      console.log('Logout successful:', response)
      // Optionally redirect or show a message after successful logout
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  return (
    <div className="pd_sidebar_wrapper">
      <div className="inner_wrap">
        <div className="logo">
          <h2>cryptoMatrix</h2>
        </div>
        {navLinks.map((item) => (
          <div className="nav_flex" onClick={() => navigate(item.link)}>
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
  )
}

export default SideBar
