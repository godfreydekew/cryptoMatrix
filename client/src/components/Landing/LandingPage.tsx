import React, { useState, useEffect } from 'react'
import {
  FaUser,
  FaRobot,
  FaRocket,
  FaChartLine,
  FaRegClock,
  FaExchangeAlt,
  FaChartPie,
  FaBitcoin,
  FaLock,
  FaEthereum,
  FaWallet,
} from 'react-icons/fa'
import './style.scss'
import { Button } from '@mui/material'
import CustomModal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../Auth/Login'
import RegisterForm from '../Auth/ConfirmPssword'
import Navbar from '../Navbar'
// @ts-ignore
import support from '../../assets/images/icons.png'
import { FaComments } from 'react-icons/fa'; 
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

            {/* {tab == 'login' && <LoginForm />}
            {tab == 'signup' && <RegisterForm />} */}
            <p>Forgot Password?</p>
          </div>
        </CustomModal>
      )}
      <div className="landing-page">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="hero">
          <h1>Take Control of Your Crypto Portfolio</h1>
          <p>
            Track your balance, monitor transactions, and analyze your
            portfolio, all in one place.
          </p>
          <div className="btn_container">
            <button className="cta-button" onClick={() => navigate('/connect')}>
              Get Started
            </button>
            <a
              href="https://github.com/godfreydekew/cryptoMatrix"
              target="_blank"
              className="cta-button github">
              Github Repo
            </a>
          </div>
        </section>

        {/* Features Section */}
        {/* Features Section */}
        <section className="features" id="features">
          <h2>What We Offer</h2>
          <div className="features_inner">
            <div className="feature-item">
              <FaChartLine className="icon" />
              <h3>Real-Time Balance Tracking</h3>
              <p>
                Stay updated with real-time tracking of your cryptocurrency
                balances across various wallets and exchanges.
              </p>
              <button onClick={() => navigate('/connect')}>Track Now</button>
            </div>
            <div className="feature-item">
              <FaExchangeAlt className="icon" />
              <h3>Transaction History</h3>
              <p>
                Access your complete transaction history, including deposits,
                withdrawals, and trades, in one place.
              </p>
              <button onClick={() => navigate('/connect')}>
                View History
              </button>
            </div>
            <div className="feature-item">
              <FaChartPie className="icon" />
              <h3>Advanced Portfolio Analysis</h3>
              <p>
                Analyze your cryptocurrency portfolio with detailed reports and
                insights to optimize your investments.
              </p>
              <button onClick={() => navigate('/connect')}>
                Analyze Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* <Team /> */}

        {/* Investment Platform Section */}
        <section className="investment-platform" id="about-us">
          <div className="investment-content">
            <div className="video-container">
              <video
                src="https://coinstats.app/static/images/onboarding/profit-loss-banner.webm"
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
              />
            </div>
            <div className="text-content">
              {/* <h3><FaRocket className="icon" /> Revolutionizing Your Crypto Experience</h3>
            <p>Our platform leverages cutting-edge Web3 technology to provide you with unparalleled control and transparency in managing your crypto assets.</p> */}
              <div className="feature-list">
                <div className="feature-item">
                  <FaRegClock className="feature-icon" />
                  <h4>Real-Time Insights</h4>
                  <p>
                    Track your assets with instantaneous updates across all your
                    wallets and exchanges, giving you complete visibility into
                    your investments.
                  </p>
                </div>
                <div className="feature-item">
                  <FaChartLine className="feature-icon" />
                  <h4>Advanced Analytics</h4>
                  <p>
                    Gain in-depth understanding of your portfolio's performance
                    through detailed reports and analytics, ensuring you make
                    informed investment decisions.
                  </p>
                </div>
                <div className="feature-item">
                  <FaRocket className="feature-icon" />
                  <h4>Next-Gen Security</h4>
                  <p>
                    Experience robust security features with Web3 standards to
                    safeguard your assets against unauthorized access and cyber
                    threats.
                  </p>
                </div>
              </div>
              {/* <button className="cta-button" onClick={() => navigate('/connect')}>Get Started</button> */}
            </div>
          </div>
        </section>

        <section className="support-section">
          <div className="support-image">
            <img src={support} alt="Support Icon" />
          </div>
          <div className="support-content">
          <h2>
          <FaComments className="chat-icon" />
            24/7 AI-Powered Customer Support</h2>
          <p>
            Our advanced AI assistant is here to provide instant support at any time.
             Whether you have questions or need assistance, you can rely on our intelligent 
             chatbot to help you navigate your crypto experience effortlessly.
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
          <div className="footer-bottom">
            <p>© 2024 CryptoMatrix</p>
            <a
              href="https://github.com/godfreydekew/cryptoMatrix"
              target="_blank"
              className="">
              Contribute: Github Repo
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default LandingPage
