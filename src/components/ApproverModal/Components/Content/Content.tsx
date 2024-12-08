import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <div className="z-10 bg-white w-[415px] h-auto p-4 rounded">{children}</div>
  );
};
