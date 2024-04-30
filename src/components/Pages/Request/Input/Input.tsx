'use client'

import { UseFormRegister } from 'react-hook-form'
import { IRequestBody, TFiles } from '../../../../types/global/types'

type TInput = {
  labelText: string
  inputName: any
  inputType: string | undefined
  inputValue?: string | number
  validationSchema?: any
  readonly: boolean | undefined
  required?: boolean
  placeholder?: string
  pattern?: string
  register: UseFormRegister<IRequestBody>
  getValues: (v: string) => TFiles
}

const Input = ({
  inputName,
  inputType,
  validationSchema,
  labelText,
  readonly = false,
  required = false,
  placeholder,
  pattern,
  register,
  getValues,
}: TInput) => {
  const files = getValues('files')

  const linkFiles = (files: TFiles) => {
    if (!files || Object.keys(files).length === 0) {
      return null
    }

    const arrayFiles = Array.from(files)

    return arrayFiles.map((file) => (
      <a key={file.name} href={file.link}>
        {file.name}
      </a>
    ))
  }

  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}
      <input
        type={inputType}
        className="rounded border-[1px] py-1 px-2 mt-2"
        {...register(inputName, validationSchema)}
        name={inputName}
        readOnly={readonly}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        multiple={inputType === 'file' ? true : undefined}
      />
      {inputName === 'files' && <div className="flex flex-row gap-2">{linkFiles(files)}</div>}
    </label>
  )
}

export default Input
