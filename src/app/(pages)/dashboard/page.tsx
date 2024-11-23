'use server';

import Container from '../../../components/Global/Container/Container';
import NoDataBox from '../../../components/Global/NoDataBox/NoDataBox';
import DashBoardContent from '../../../components/Pages/Dashboard/DashboardContent';
import { getRequests } from '../../../hooks/GetRequests';

export default async function Dashboard() {
  const requestsData = await getRequests();

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
