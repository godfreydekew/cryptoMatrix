// LoginForm.tsx
import React from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '../customInput/CustomInput'
import { Button } from '@mui/material'

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = (data: FieldValues) => {
    console.log(data) // Access the form data here
    // navigate('/dashboard')
    window.open('/dashboard')
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          label="FullName"
          type="text"
          name="name"
          register={register}
          required="Name is required"
          errors={errors}
        />

        {/* CustomInput for Password */}
        <CustomInput
          label="Password"
          type="password"
          name="password"
          register={register}
          required="Password is required"
          errors={errors}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
