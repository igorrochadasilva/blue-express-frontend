import { ReactNode } from 'react';

interface IContentProps {
  children: ReactNode;
}

export function Content({ children }: IContentProps) {
  return <div className="flex flex-col mt-5">{children}</div>;
}
