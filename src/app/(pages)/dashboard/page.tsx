import Container from '../../../components/Global/Container/Container'
import NoRequestsBox from '../../../components/Global/NoRequestsBox/NoRequestsBox'
import DashBoardContent from '../../../components/Pages/Dashboard/DashboardContent'
import { getRequests } from '../../../hooks/GetRequests'

export default async function Dashboard() {
  const requestsData = await getRequests()

  return (
    <Container title="Dashboard">
      {requestsData.length > 0 ? <DashBoardContent requestsData={requestsData} /> : <NoRequestsBox />}
    </Container>
  )
}
