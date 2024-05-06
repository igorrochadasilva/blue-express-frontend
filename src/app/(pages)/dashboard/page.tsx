'use server'

import Container from '../../../components/Global/Container/Container'
import { getRequests } from '../../../actions/auth'
import DashBoardContent from '../../../components/Pages/Dashboard/DashboardContent'

export default async function Dashboard() {
  const requests = await getRequests()

  return (
    <Container title="Dashboard">
      <DashBoardContent requests={requests} />
    </Container>
  )
}
