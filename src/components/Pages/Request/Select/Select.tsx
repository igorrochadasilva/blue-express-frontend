'use client'

import { UseFormRegister } from 'react-hook-form'
import { IRequestBody } from '../../../../types/global/types'

type TSelect = {
  labelText: string
  inputName: any
  validationSchema?: any
  required?: boolean
  readonly?: boolean
  options: any
  register: UseFormRegister<IRequestBody>
}

const Select = ({ labelText, inputName, validationSchema, required = false, options, register }: TSelect) => {
  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}

      <select
        {...register(inputName, validationSchema)}
        name={inputName}
        required={required}
        className="rounded border-[1px] py-1 px-2 mt-2"
      >
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
