interface IButtonProps {
  showForgetPassword: boolean
}

export function Button({ showForgetPassword }: IButtonProps) {
  return (
    <button type="submit" className="h-10 text-white bg-be_first_color rounded mb-5 mt-6  text-lg">
      {showForgetPassword ? 'Continue' : 'Log in'}
    </button>
  )
}
