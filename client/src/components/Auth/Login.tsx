import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '../customInput/CustomInput'
import { Button } from '@mui/material'
import { loginUser } from '../../api/api'
import { useAuth } from '../../store/AuthProvider' // Import the auth context

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()
  const { login } = useAuth() // Get login function from context
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await loginUser(data.email, data.password)
      alert(`Successful, ${response}`)
      console.log(response)

      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
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
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
