import React, { useState, useEffect } from 'react'
import { FaBitcoin, FaEthereum, FaWallet } from 'react-icons/fa'
import './style.scss'
import { Button } from '@mui/material'
import CustomModal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../Auth/Login'
import RegisterForm from '../Auth/Register'
import Team from '../Team'
import Navbar from '../Navbar'
import support from '../../assets/images/icons.png'

const authTab = [
  {
    name: 'Log In',
    value: 'login',
  },
]

const LandingPage: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [tab, setTab] = useState<string | null>('login')
  const navigate = useNavigate()
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
      <div className="landing-page">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="hero">
          <h1>We make crypto clear and simple</h1>
          <p>
            Buy, sell, and grow your crypto assets on CryptoMatrix, the platform
            designed for everyone.
          </p>
          <button className="cta-button" onClick={() => navigate('/connect')}>
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="features" id="features">
          <h2>What We offer</h2>
          <div className="features_inner">
            <div className="feature-item">
              <FaBitcoin className="icon" />
              <h3>Trade Desk</h3>
              <p>Instant access to professional trading options.</p>
              <button onClick={() => navigate('/connect')}>Get Started</button>
            </div>
            <div className="feature-item">
              <FaEthereum className="icon" />
              <h3>CryptoMatrix ATMs</h3>
              <p>Find a crypto ATM near you.</p>
              <button>Find an ATM</button>
            </div>
            <div className="feature-item">
              <FaWallet className="icon" />
              <h3>CryptoMatrix Wallet</h3>
              <p>Download our secure crypto wallet.</p>
              <button>Download</button>
            </div>
          </div>
        </section>
        <Team />

        {/* Investment Platform Section */}
        <section className="investment-platform" id="about-us">
          <h2>
            A crypto investment platform <br /> that invests in you
          </h2>
          <p>
            We invest more resources than any other platrom in making sure great{' '}
            <br />
            support from real people is a click away, whenever you need it.
          </p>
          <button className="cta-button" onClick={() => navigate('/connect')}>
            Get Started
          </button>
        </section>
        <section className="support-section">
          <div className="support-image">
            <img src={support} alt="Support Icon" />
          </div>
          <div className="support-content">
            <h2>24/7 access to full service customer support</h2>
            <p>
              We invest more resources than any other platform in making sure
              great support from real people is a click away, whenever you need
              it.
            </p>
            <button
              className="get-started-btn"
              onClick={() => navigate('/connect')}>
              Get Started
            </button>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="CryptoMatrix-footer">
          {/* <div className="footer-content">
            <div className="footer-left">
              <h1>CryptoMatrix</h1>
              <p>
                CryptoMatrix, the world’s leading bitcoin ATM operator, makes it
                so flippin’ easy to buy and sell bitcoin via cash, card, or bank
                transfer.
              </p>
              <p>
                Sign up to get the latest in CryptoMatrix news, discounts, and
                more.
              </p>
              <div className="email-input-wrapper">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="email-input"
                />
                <button className="submit-btn">
                  <span className="arrow">&rarr;</span>
                </button>
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-links">
                <div className="company">
                  <h3>Company</h3>
                  <ul>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Careers</a>
                    </li>
                    <li>
                      <a href="#">Press</a>
                    </li>
                    <li>
                      <a href="#">News</a>
                    </li>
                    <li>
                      <a href="#">Merch</a>
                    </li>
                  </ul>
                </div>
                <div className="privacy">
                  <h3>Privacy Policy and Terms of Service</h3>
                  <ul>
                    <li>
                      <a href="#">CryptoMatrix Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">CryptoMatrix Biometrics Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">CryptoMatrix Financial Privacy Notice</a>
                    </li>
                    <li>
                      <a href="#">CryptoMatrix Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">CryptoMatrix Trade Desk Terms of Service</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          <div className="footer-bottom">
            <p>© 2024 CryptoMatrix</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default LandingPage
