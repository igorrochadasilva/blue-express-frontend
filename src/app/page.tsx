'use client'

import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { handleForgetPassword, handleLogin } from '../actions/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Container from '../components/Global/Container/Container'

type LoginInputs = {
  email: string
  password: string
}

export default function Login() {
  const [showForgetPassword, setShowForgetPassword] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmitLogin: SubmitHandler<LoginInputs> = async (data) => {
    if (!showForgetPassword) {
      const isLogin = await handleLogin(data)

      isLogin && router.push('/dashboard')
    } else {
      const isSendEmail = await handleForgetPassword(data.email)
      isSendEmail && setShowForgetPassword(false)
    }
  }

  return (
    <Container bgColor="bg-gray-400" showSideMenu={false}>
      <div className="w-full flex justify-center items-center">
        <div className="w-[480px] h-[500px] bg-white text-slate-800 rounded">
          <div className="flex justify-end">
            <XMarkIcon
              onClick={() => {
                setShowForgetPassword(false)
              }}
              className={`h-6 w-6 text-slate-800 text-end cursor-pointer ${
                showForgetPassword ? 'block' : 'hidden'
              }`}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="px-12 py-6"
            action=""
          >
            <div className="flex justify-center">
              <Image
                src="/logo-dell.svg"
                width={100}
                height={100}
                alt="Logo"
                className="rounded-full"
                priority={true}
              />
            </div>

            <div className="flex flex-col">
              {showForgetPassword && (
                <span className="my-4 mx-4 text-center">
                  Enter your email and we will send you instructions to reset
                  your password.
                </span>
              )}
              <label htmlFor="E-mail" className="mb-2">
                E-mail
              </label>
              <input
                className="w-full p-4 rounded bg-slate-200"
                id="email"
                autoComplete="username"
                {...register('email', {
                  required: 'required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                type="email"
              />
              {errors.email && (
                <span className="text-sm text-red-500" role="alert">
                  {errors.email.message}
                </span>
              )}
              {!showForgetPassword && (
                <>
                  <label htmlFor="Password" className="mb-2 mt-2">
                    Password
                  </label>
                  <input
                    autoComplete="current-password"
                    className="w-full p-4 rounded bg-slate-200"
                    id="password"
                    {...register('password', {
                      required: 'required',
                      minLength: {
                        value: 6,
                        message: 'min length is 6',
                      },
                    })}
                    type="password"
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </>
              )}
              <button
                type="submit"
                className="h-10 text-white bg-be_first_color rounded mb-5 mt-6  text-lg"
              >
                {showForgetPassword ? 'Continue' : 'Log in'}
              </button>
              {!showForgetPassword && (
                <span
                  className="m-auto cursor-pointer"
                  onClick={() => setShowForgetPassword(true)}
                >
                  Forgot <a href="#">password?</a>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
