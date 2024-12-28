import { SideMenu } from '@/components/SideMenu/SideMenu';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-h-screen">
      <SideMenu />
      <div className="max-x-screen h-full bg-[#e5e5e5] overflow-auto ml-[228px] px-10 py-4">
        {children}
      </div>
    </div>
  );
};
