'use server'

import { ReactNode } from 'react'

interface IRoot {
  children: ReactNode
}

const Root = async ({ children }: IRoot) => {
  return <div className="flex flex-col w-full ">{children}</div>
}
export default Root
