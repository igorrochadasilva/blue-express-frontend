'use client'

import { FormEventHandler, ReactNode } from 'react'

interface IFormProps {
  onSubmitForm: FormEventHandler<HTMLFormElement>
  children: ReactNode
}

const Form = ({ onSubmitForm, children }: IFormProps) => {
  return (
    <form onSubmit={onSubmitForm} action="">
      {children}
    </form>
  )
}

export default Form
