import { UseFormRegister } from 'react-hook-form'

type LoginInputs = {
  email: string
  password: string
}

interface IInputProps {
  labelText: string
  inputName: 'email' | 'password'
  inputType: string
  message: string
  errors: any
  patternValue?: RegExp
  register: UseFormRegister<LoginInputs>
}

export function Input({
  labelText,
  inputName,
  inputType,
  errors,
  message,
  patternValue = /.s/,
  register,
}: IInputProps) {
  return (
    <>
      <label htmlFor={labelText} className="mb-2">
        {labelText}
      </label>
      <input
        className="w-full p-4 rounded bg-slate-200"
        id={inputName}
        {...register(inputName, {
          required: 'required',
          pattern: {
            value: patternValue,
            message: message,
          },
        })}
        type={inputType}
      />
      {errors.inputName && (
        <span className="text-sm text-red-500" role="alert">
          {errors.inputName.message}
        </span>
      )}
    </>
  )
}
