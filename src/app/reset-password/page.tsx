'use client'

import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'

import { XMarkIcon } from '@heroicons/react/24/solid'
import Container from '../../components/Container/Global/Container'
import { useSearchParams } from 'next/navigation'

import Link from 'next/link'
import { handleResetPassword } from '../../actions/auth'

type ResetInput = {
  password: string
}

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>()

  const onSubmitLogin: SubmitHandler<ResetInput> = async (data) => {
    const { password } = data
    const response = await handleResetPassword({ password, token })
  }

  return (
    <Container bgColor="bg-gray-400">
      <div className="w-full flex justify-center items-center">
        <div className="w-[480px] h-[500px] bg-white text-slate-800 rounded">
          <div className="flex justify-end">
            <Link href="/">
              <XMarkIcon className="h-6 w-6 text-slate-800 text-end cursor-pointer" />
            </Link>
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
            <div className="flex flex-col mt-5">
              <span className="my-4 text-center font-semibold">
                Reset password
              </span>
              <label htmlFor="Password" className="mb-2 mt-2">
                Enter with your new password.
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
              <button
                type="submit"
                className="h-10 text-white bg-blue_express rounded mb-5 mt-6 text-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
