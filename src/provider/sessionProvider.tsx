'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface TNextAuthSessionProvider {
  children: ReactNode
}

function NextAuthSessionProvider({ children }: TNextAuthSessionProvider) {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSessionProvider
