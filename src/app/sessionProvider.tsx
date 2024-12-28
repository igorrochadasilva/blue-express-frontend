'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

interface NextAuthSessionProviderProps {
  children: ReactNode;
}

export function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return (
    <SessionProvider>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
}
