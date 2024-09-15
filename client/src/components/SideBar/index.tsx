import React from 'react'
import './style.scss'
import { CgMenuGridR } from 'react-icons/cg'
import { IoPieChartOutline } from 'react-icons/io5'
import { IoWalletOutline } from 'react-icons/io5'
import { GrTransaction } from 'react-icons/gr'
import { RiNewsLine } from 'react-icons/ri'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Overview', icon: <CgMenuGridR />, link: '/dashboard' },
    { name: 'Chart', icon: <IoPieChartOutline />, link: '/chart' },
    {
      name: 'Transactions',
      icon: <GrTransaction />,
      link: '/dashboard/transactions',
    },
    { name: 'Wallet', icon: <IoWalletOutline />, link: '/dashboard' },
    { name: 'News', icon: <RiNewsLine />, link: '/news' },
  ]
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
        <div className="nav_flex bottom">
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
