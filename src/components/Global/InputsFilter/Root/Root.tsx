import { ReactNode } from 'react';

interface IRootProps {
  children: ReactNode;
}

export function Root({ children }: IRootProps) {
  return (
    <div className="flex flex-row gap-4 mb-12 items-center text-sm">
      {children}
    </div>
  );
}
