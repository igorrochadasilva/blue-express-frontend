import { ReactNode } from 'react';

interface IRootProps {
  children: ReactNode;
}

const Root = ({ children }: IRootProps) => (
  <div className="mt-10 rounded flex justify-between items-center gap-6">
    {children}
  </div>
);

export default Root;
