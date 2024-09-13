// LoginForm.tsx
import React from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '../customInput/CustomInput'
import { Button } from '@mui/material'

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = (data: FieldValues) => {
    console.log(data) // Access the form data here
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
          inputClass="login-short"
        />

        {/* CustomInput for Password */}
        <CustomInput
          label="Password"
          type="password"
          name="password"
          register={register}
          required="Password is required"
          errors={errors}
          inputClass="login-short"
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
