import React, { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '../customInput/CustomInput'
import { Button } from '@mui/material'
import { resetPassword } from '../../api/api'
import ToastWidget from '../ToastWidget'

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    mode: 'onChange', // Validate the form on change to enable/disable the button dynamically
  })

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
    autoHideDuration: 5000,
  })

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await resetPassword(data.email)
      setToast({
        open: true,
        message: response.message,
        severity: 'success',
        autoHideDuration: 300,
      })
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
  const email = watch('email')
  const handleToastClose = () => {
    setToast({ ...toast, open: false })
  }

  return (
    <div className="login-container">
      <p>We’ll send a reset code to your associated email address.</p>
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

        <Button type="submit" variant="contained" disabled={!email || !isValid}>
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

export default ResetPassword
