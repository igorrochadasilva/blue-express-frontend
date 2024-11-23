import { ReactNode } from 'react';
import SideMenu from '../SideMenu/SideMenu';

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="max-h-screen">
      <SideMenu />
      <div className="max-x-screen h-full bg-[#e5e5e5] overflow-auto ml-[228px] px-10 py-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
