// LoginForm.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '../customInput/CustomInput'
import { Button } from '@mui/material'
import { confirmPassword } from '../../api/api'
import ToastWidget from '../ToastWidget'

const ConfirmPassword: React.FC = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
    autoHideDuration: 5000,
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await confirmPassword(
        data.email,
        data.newPassword,
        data.recoveryCode,
      )
      setToast({
        open: true,
        message: response.message,
        severity: 'success',
        autoHideDuration: 300,
      })
      navigate('/dashboard')
    } catch (error: any) {
      setToast({
        open: true,
        message: `${error.response.data.error}`,
        severity: 'error',
        autoHideDuration: 300,
      })
    }
  }

  // Watch the email field value
  const handleToastClose = () => {
    setToast({ ...toast, open: false })
  }

  return (
    <div className="password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form_wrapper">
        {/* CustomInput for Email */}
        <CustomInput
          label="Email"
          type="email"
          name="email"
          register={register}
          required="Email is required"
          errors={errors}
        />

        <CustomInput
          label="Recovery Code"
          type="text"
          name="recoveryCode"
          register={register}
          required="Recovery code is require"
          errors={errors}
        />

        {/* CustomInput for Password */}
        <CustomInput
          label="New Password"
          type="password"
          name="newPassword"
          register={register}
          required="Password is required"
          errors={errors}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained">
          Reset Password
        </Button>
      </form>

      <ToastWidget
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </div>
  )
}

export default ConfirmPassword
