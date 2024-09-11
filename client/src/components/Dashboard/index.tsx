import React from 'react'
import './style.scss'
import SideBar from '../SideBar'
import MainDashBoard from './MainDashBoard'

const DashBoard = () => {
  return (
    <div className="pd_db_wrapper">
      <SideBar />
      <MainDashBoard />
    </div>
  )
}

export default DashBoard
