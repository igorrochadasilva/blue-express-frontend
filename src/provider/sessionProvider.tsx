'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

interface TNextAuthSessionProvider {
  children: ReactNode
}

function NextAuthSessionProvider({ children }: TNextAuthSessionProvider) {
  return (
    <SessionProvider>
      <ToastContainer />
      {children}
    </SessionProvider>
  )
}

export default NextAuthSessionProvider
