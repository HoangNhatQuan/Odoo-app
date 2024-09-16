import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { login } from '@/apis/auth/auth.api'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/providers/toast.provider'
import { useState } from 'react'

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { message } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
  })
  const email = watch('email')
  const password = watch('password')

  const onLogin = async (data: FormData) => {
    try {
      setLoading(true)
      await login(data)
      await navigate('/')
      clearErrors()
      message({ msg: 'Login successfully', type: 'success' })
    } catch (er: any) {
      message({ msg: er.response.data.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-5 bg-white rounded-lg shadow-lg">
        <h4 className=" font-bold text-center">Login</h4>
        <div className="space-y-6">
          <div className="flex flex-col gap-1 space-y-2">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Enter Email"
                {...register('email')}
                onChange={(e) => setValue('email', e.target.value)}
                value={email}
              />
            </label>
            {errors.email?.message && (
              <span className="text-sm text-danger">
                {'*' + errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 space-y-2">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Enter Password"
                onChange={(e) => setValue('password', e.target.value)}
                value={password}
              />
            </label>
            {errors.password?.message && (
              <span className="text-sm text-danger">
                {'*' + errors.password.message}
              </span>
            )}
          </div>
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit(onLogin)}
        >
          Login now {loading && <div className="loading loading-dots" />}
        </button>
        <div>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register now
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
