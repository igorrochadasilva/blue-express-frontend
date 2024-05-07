'use server'

import Container from '../../../components/Global/Container/Container'
import DashBoardContent from '../../../components/Pages/Dashboard/DashboardContent'
import { getRequests } from '../../../hooks/GetRequests'

export default async function Dashboard() {
  const requestsData = await getRequests()

  return (
    <Container title="Dashboard">
      <DashBoardContent requestsData={requestsData} />
    </Container>
  )
}
