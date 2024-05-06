'use server'

import { ReactNode } from 'react'

interface IRoot {
  children: ReactNode
  bgColor: string
}

const Root = async ({ children, bgColor }: IRoot) => {
  return <main className={`flex w-full min-h-screen ${bgColor}`}>{children}</main>
}
export default Root
