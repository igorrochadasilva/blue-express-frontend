'use server';

import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export const Root = async ({ children }: RootProps) => {
  return <div className="flex flex-col w-full ">{children}</div>;
};
