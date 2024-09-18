// Navbar.tsx

import { FaBars, FaTimes } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { FaBitcoin, FaEthereum, FaWallet } from 'react-icons/fa'
import './style.scss'
import { Button } from '@mui/material'
import CustomModal from '../Modal/Modal'
import { useForm, FieldValues } from 'react-hook-form'

import CustomInput from '../customInput/CustomInput'
import LoginForm from '../Auth/Login'
import RegisterForm from '../Auth/Register'
import Team from '../Team'

const authTab = [
  {
    name: 'Log In',
    value: 'login',
  },
]

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  const [scrollPosition, setScrollPosition] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [tab, setTab] = useState<string | null>('login')
  const updatePosition = () => {
    setScrollPosition(window.pageYOffset)
  }
  useEffect(() => {
    window.addEventListener('scroll', updatePosition)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', updatePosition)
    }
  }, [])
  console.log(scrollPosition)
  return (
    <>
      {openModal && (
        <CustomModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          className="login_modal">
          <div className="login_wrapper">
            <div className="auth_tab_container">
              {authTab.map((item: any, i: number) => {
                return (
                  <Button
                    key={i}
                    onClick={() => {
                      setTab(item.value)
                      const newUrl = `${window.location.origin}${window.location.pathname}?tab=${item.value}`
                      window.history.replaceState(null, '', newUrl)
                    }}
                    className={`tab-btn ${
                      tab === item.value ? 'active' : ''
                    } `}>
                    {item.name}
                  </Button>
                )
              })}
            </div>
            {tab == 'login' && <LoginForm />}
            {tab == 'signup' && <RegisterForm />}
          </div>
        </CustomModal>
      )}
      <nav className={`navbar ${isMobileMenuOpen ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo">
            Crypto<span>Matrix</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/#about-us">About Us</a>
            </li>
            <li>
              <a href="/#features">Features</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="auth-buttons">
            <button className="sign-in" onClick={() => setOpenModal(true)}>
              Log In
            </button>
            <button className="sign-up">
              <a href="/connect">Sign Up</a>
            </button>
          </div>
          <div className="menu-icon" onClick={handleMenuToggle}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a href="/#about-us">About Us</a>
            </li>
            <li>
              <a href="/#features">Features</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="mobile-auth-buttons">
            <button className="sign-in" onClick={() => setOpenModal(true)}>
              Log In
            </button>
            <button className="sign-up">
              <a href="/connect">Sign Up</a>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
