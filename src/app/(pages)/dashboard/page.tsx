'use server';

import Container from '@/components/Global/Container/Container';
import { useGetRequests } from '@/hooks/useGetRequests';
import { DashBoard } from './components/Dashboard';
import NoDataBox from '@/components/Global/NoDataBox/NoDataBox';

export default async function DashboardPage() {
  const requestsData = await useGetRequests();

  return (
    <Container title="Dashboard">
      {requestsData.length > 0 ? (
        <DashBoard requestsData={requestsData} />
      ) : (
        <NoDataBox text="There are no requests to show..." />
      )}
    </Container>
  );
}
