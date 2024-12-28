import { Layout } from '@/components/Layout/Layout';
import { ReactNode } from 'react';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return <Layout>{children}</Layout>;
}
