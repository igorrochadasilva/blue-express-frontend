'use client'

import Container from '../../components/Global/Container/Container'
import Content from '../../components/Global/Content/Content'
import RequestsChart from '../../components/Pages/Dashboard/RequestsChart/RequestsChart'
import RequestsList from '../../components/Pages/Dashboard/RequestsList/RequestsList'
import useRequestData from '../../hooks/UseRequestData/UseRequestData'

export default function Dashboard() {
  const { requests, isLoading, error } = useRequestData()

  return (
    <Container title="Dashboard">
      {isLoading ? (
        <div className="flex justify-center items-center w-40 m-auto h-10 rounded bg-white font-bold">
          <p>Loading ...</p>
        </div>
      ) : (
        <>
          <Content>
            <RequestsChart requests={requests} />
          </Content>
          <Content>
            <RequestsList requests={requests} />
          </Content>
        </>
      )}
    </Container>
  )
}
