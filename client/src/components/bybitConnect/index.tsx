import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import CustomInput from '../customInput/CustomInput'
import { useForm, FieldValues } from 'react-hook-form'
import { Button } from '@mui/material'
import { registerUser } from '../../api/api'
const BybitApiSync: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    console.log(data) // Access the form data here

    try {
      const response = await registerUser(
        data.name,
        data.email,
        data.password,
        data.api_key,
        data.api_secret,
      )
      alert(`Registration successful:, ${response}`)
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="api-sync-container">
      <div className="wrapper">
        <div className="left-section">
          <div className="header">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bybit_logo.svg/512px-Bybit_logo.svg.png"
              alt="Bybit"
              className="logo"
            />
            <h2>API Sync</h2>
          </div>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <CustomInput
                label="Name"
                type="text"
                name="name"
                register={register}
                required="Name is required"
                errors={errors}
              />
            </div>
            <div className="input-group">
              <CustomInput
                label="Email"
                type="email"
                name="email"
                register={register}
                required="Email is required"
                errors={errors}
              />
            </div>
            <div className="input-group">
              <CustomInput
                label="Password"
                type="password"
                name="password"
                register={register}
                required="Password is required"
                errors={errors}
              />
            </div>
            <div className="input-group">
              <CustomInput
                label="API Key"
                type="text"
                name="api_key"
                register={register}
                required="API Key is required"
                errors={errors}
              />
              <button type="button" className="paste-button">
                Paste
              </button>
            </div>

            <div className="input-group">
              <CustomInput
                label="API Secret"
                type="password"
                name="api_secret"
                register={register}
                required="Secret key is required"
                errors={errors}
              />
              <button type="button" className="paste-button">
                Paste
              </button>
            </div>

            <Button type="submit" className="connect-button">
              Connect
            </Button>
          </form>

          <div className="info-box">
            <h4>Secure Connection</h4>
            <p>
              All data is exchanged over a secure, encrypted connection to
              protect your information.
            </p>
          </div>
          <div className="info-box">
            <h4>Read-Only Access</h4>
            <p>
              This integration has read-only access and cannot make changes to
              your account or move funds.
            </p>
          </div>
          <div className="info-box">
            <h4>User-Controlled Permissions</h4>
            <p>
              You are in control. You can review and revoke access at any time
              from your account settings.
            </p>
          </div>
        </div>

        <div className="right-section">
          <h3>Instructions</h3>
          <ol>
            <li>Login to your ByBit account</li>
            <li>Open dropdown menu from Profile icon and click on API</li>
            <li>Click Create New Key</li>
            <li>Select the System-generated API Keys option</li>
            <li>Enable 2FA if needed</li>
            <li>
              Enter the API name (ex. CoinStats ByBit) in Name for the API key
            </li>
            <li>Enable Read-Only and No IP restriction permissions</li>
            <li>
              Enable Unified Trading account permission, along with Assets, and
              click Submit
            </li>
            <li>
              Pass the Security verification by inputting the 2FA and
              verification email codes
            </li>
            <li>
              Copy and Paste your API Key and the API Secret Key into CoinStats
            </li>
          </ol>
          <p className="note">
            Note: The API key will expire in 3 months if it is created without
            restrictions. Also, if the ByBit account password has been changed,
            the API secret key will only be valid for a maximum of 7 days.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BybitApiSync
