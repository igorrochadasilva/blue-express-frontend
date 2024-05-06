'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { handleForgetPassword } from '../../actions/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { notifyDefaultError, notifyError } from '../../toast/notifications'
import Loading from '../../components/Global/Loading/loading'
import { Login } from '../../components/Pages/Login'

type LoginInputs = {
  email: string
  password: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [showForgetPassword, setShowForgetPassword] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const handleShowForgetPassword = () => {
    setShowForgetPassword(!showForgetPassword)
  }

  const onSubmitLogin: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true)
    const { email, password } = data

    if (!showForgetPassword) {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.status === 200) {
        setIsLoading(true)
        router.push('/dashboard')
      } else if (res?.status === 401) {
        notifyError(res.error as string)
        setIsLoading(false)
      } else {
        notifyDefaultError()
        setIsLoading(false)
      }
    } else {
      const isSendEmail = await handleForgetPassword(data.email)
      isSendEmail && setShowForgetPassword(false)
      setIsLoading(false)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Login.Root>
      <Login.IconClose handleShowForgetPassword={handleShowForgetPassword} showForgetPassword />
      <Login.Form onSubmitLogin={handleSubmit(onSubmitLogin)}>
        <Login.LogoImg />
        <Login.Content>
          {showForgetPassword && <Login.ForgetPasswordMsg />}
          <Login.Input
            inputName="email"
            inputType="email"
            labelText="E-mail"
            message="Entered value does not match email format"
            patternValue={/\S+@\S+\.\S+/}
            errors={errors}
            register={register}
          />
          {!showForgetPassword && (
            <Login.Input
              inputName="password"
              inputType="password"
              labelText="Password"
              message="Entered value does not match password format"
              errors={errors}
              register={register}
            />
          )}
          <Login.Button showForgetPassword={showForgetPassword} />
          {!showForgetPassword && <Login.ForgetButton handleShowForgetPassword={handleShowForgetPassword} />}
        </Login.Content>
      </Login.Form>
    </Login.Root>
  )
}
