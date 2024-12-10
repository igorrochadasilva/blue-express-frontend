'use server';

import { Container } from '@/components/Container/Container';
import { getRequests } from '@/hooks/useGetRequests';
import { DashBoard } from './components/Dashboard';
import { NoDataBox } from '@/components/NoDataBox/NoDataBox';

export default async function DashboardPage() {
  const requestsData = await getRequests();

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
