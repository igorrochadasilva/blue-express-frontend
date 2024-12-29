import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] h-[500px] bg-white text-slate-800 rounded flex flex-col justify-evenly items-center relative">
        {children}
      </div>
    </div>
  );
}
