// src/components/LandingPage.jsx
import React, { useState } from 'react'
import Users from '../Users/users'
import './style.scss'
import { Button } from '@mui/material'
import CustomModal from '../Modal/Modal'
import { useForm, FieldValues } from 'react-hook-form'

import CustomInput from '../customInput/CustomInput'
import LoginForm from '../Auth/Login'
import RegisterForm from '../Auth/Register'

const authTab = [
  {
    name: 'Log In',
    value: 'login',
  },
  {
    name: 'Sign Up',
    value: 'signup',
  },
]
const LandingPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [tab, setTab] = useState<string | null>('login')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = (data: any) => {
    console.log(data) // Access the form data here
  }

  return (
    <>
      <div className="pd_landing">
        <h1>Welcome to the Landing Page!</h1>
        <a href="/dashboard">My dashboard</a>
        <a href="/connect">Connect to Bybit</a>
        <Button onClick={() => setOpenModal(true)}>Login</Button>
      </div>

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
    </>
  )
}

export default LandingPage
