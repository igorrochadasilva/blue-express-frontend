'use server';

import Container from '../../../components/Global/Container/Container';
import NoDataBox from '../../../components/Global/NoDataBox/NoDataBox';
import DashBoardContent from '../../../components/Pages/Dashboard/DashboardContent';
import { useGetRequests } from '../../../hooks/useGetRequests';

export default async function Dashboard() {
  const requestsData = await useGetRequests();

  return (
    <Container title="Dashboard">
      {requestsData.length > 0 ? (
        <DashBoardContent requestsData={requestsData} />
      ) : (
        <NoDataBox text="There are no requests to show..." />
      )}
    </Container>
  );
}
