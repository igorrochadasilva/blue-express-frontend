'use client'

import { UseFormRegister } from 'react-hook-form'
import { IRequestBody } from '../../../types/global/types'

type TInputForm = {
  labelText: string
  inputName: any
  inputType: string
  inputValue?: string | number
  validationSchema?: any
  readonly?: boolean
  required?: boolean
  placeholder?: string
  pattern?: string
  errors?: any
  register: UseFormRegister<IRequestBody>
}

const InputForm = ({
  inputName,
  inputType,
  inputValue,
  validationSchema,
  labelText,
  readonly = false,
  required = false,
  placeholder,
  pattern,
  register,
}: TInputForm) => {
  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}
      <input
        type={inputType}
        className="rounded border-[1px] py-1 px-2 mt-2"
        {...register(inputName, validationSchema)}
        name={inputName}
        value={inputValue}
        readOnly={readonly}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
      />
    </label>
  )
}

export default InputForm
