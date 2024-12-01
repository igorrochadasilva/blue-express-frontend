import { ReactNode } from 'react';
import Layout from '../../components/Global/Layout/Layout';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return <Layout>{children}</Layout>;
}
