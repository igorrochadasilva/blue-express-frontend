import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 transition-opacity text-be_second_color">
      <div className="absolute w-full h-full bg-black opacity-90"></div>
      {children}
    </div>
  );
};
