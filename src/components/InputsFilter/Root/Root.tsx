import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <div className="flex flex-row gap-4 mb-12 items-center text-sm">
      {children}
    </div>
  );
}
