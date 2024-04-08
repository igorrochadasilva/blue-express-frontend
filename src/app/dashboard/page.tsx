'use client'

import Container from '../../components/Global/Container/Container'
import Content from '../../components/Global/Content/Content'
import RequestsChart from '../../components/Pages/Dashboard/RequestsChart/RequestsChart'
import { listMaintenanceContractRequests } from '../../actions/maintenence-contract'
import { useEffect, useState } from 'react'
import { listSoftwareServiceContractRequests } from '../../actions/software-service-contract'
import { listDistributorRepresentativesContractRequests } from '../../actions/distributor-representatives-contract'
import RequestsList from '../../components/Pages/Dashboard/RequestsList/RequestsList'

export default function Dashboard() {
  const [requests, setRequests] = useState([])
  const [loadingRequests, setLoadingRequests] = useState(true)

  useEffect(() => {
    const getAllContracts = async () => {
      const maintenanceContracts = await listMaintenanceContractRequests()
      const softwareServiceContracts =
        await listSoftwareServiceContractRequests()
      const distributorRepresentativesContracts =
        await listDistributorRepresentativesContractRequests()
      const allRequests = maintenanceContracts.concat(
        softwareServiceContracts,
        distributorRepresentativesContracts
      )
      setRequests(allRequests)
      setLoadingRequests(false)
    }

    getAllContracts()
  }, [])

  return (
    <Container title="Dashboard">
      {loadingRequests ? (
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
