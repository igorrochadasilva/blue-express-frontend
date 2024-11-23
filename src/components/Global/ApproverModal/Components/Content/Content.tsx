import { ReactNode } from 'react';

interface IContentProps {
  children: ReactNode;
}

const Content = ({ children }: IContentProps) => {
  return (
    <div className="z-10 bg-white w-[415px] h-auto p-4 rounded">{children}</div>
  );
};

export default Content;
