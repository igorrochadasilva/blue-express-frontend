import { MouseEventHandler } from 'react'

interface IForgetButtonProps {
  handleShowForgetPassword: MouseEventHandler<HTMLSpanElement>
}

export function ForgetButton({ handleShowForgetPassword }: IForgetButtonProps) {
  return (
    <span className="m-auto cursor-pointer" onClick={handleShowForgetPassword}>
      Forgot <a href="#">password?</a>
    </span>
  )
}
