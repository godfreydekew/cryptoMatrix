import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '../customInput/CustomInput'
import { Button } from '@mui/material'
import { loginUser } from '../../api/api'
import { useAuth } from '../../store/AuthProvider' // Import the auth context
import ToastWidget from '../ToastWidget'

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()
  const { login } = useAuth() // Get login function from context
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
    autoHideDuration: 5000,
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await loginUser(data.email, data.password)
      setLoading(true)
      setToast({
        open: true,
        message: 'Failed to send reset link. Please try again.',
        severity: 'success',
        autoHideDuration: 300,
      })

      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login failed:', error)
      setToast({
        open: true,
        message: `${error.response.data.error}`,
        severity: 'error',
        autoHideDuration: 300,
      })
    }
  }

  const handleToastClose = () => {
    setToast({ ...toast, open: false })
  }

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            register={register}
            required="Email is required"
            errors={errors}
            inputClass="login-short"
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            register={register}
            required="Password is required"
            errors={errors}
            inputClass="login-short"
          />
          <Button type="submit" variant="contained">
            {loading ? 'lodaing...' : 'Login'}
          </Button>
        </form>
      </div>

      <ToastWidget
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </>
  )
}

export default LoginForm
