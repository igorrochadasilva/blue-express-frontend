'use client'

import { useEffect, useState } from 'react'
import Container from '../../../components/Global/Container/Container'
import Content from '../../../components/Global/Content/Content'
import PeriodFilter from '../../../components/Pages/Dashboard/PeriodFilter'
import RequestsChart from '../../../components/Pages/Dashboard/RequestsChart'
import RequestsList from '../../../components/Pages/Dashboard/RequestsList'
import useRequestData from '../../../hooks/UseRequestData'
import { IRequestBody } from '../../../types/global/types'

export default function Dashboard() {
  const { requests, isLoading, error } = useRequestData()
  const [filteredRequests, setFilteredRequests] = useState<IRequestBody[]>([])
  const [selectPeriodValue, setSelectPeriodValue] = useState<string>('')

  const filterRequestByPeriod = () => {
    if (selectPeriodValue !== 'all') {
      const days = Number(selectPeriodValue)
      const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

      const filterRequests = requests.filter((request: IRequestBody) => {
        const requestDate = new Date(request.createdAt)
        return requestDate >= thresholdDate
      })

      setFilteredRequests(filterRequests)
    } else {
      setFilteredRequests(requests)
    }
  }

  const handleSelectPeriodChange = (value: string) => {
    setSelectPeriodValue(value)
  }

  useEffect(() => {
    selectPeriodValue ? filterRequestByPeriod() : setFilteredRequests(requests)
  }, [requests, selectPeriodValue])

  return isLoading ? (
    <Container title="Loading"></Container>
  ) : (
    <Container title="Dashboard">
      <>
        <PeriodFilter handleSelectPeriodChange={handleSelectPeriodChange} />
        {filteredRequests.length > 0 && (
          <>
            <Content>
              <RequestsChart requests={filteredRequests} />
            </Content>
            <Content>
              <RequestsList requests={filteredRequests} />
            </Content>
          </>
        )}
      </>
    </Container>
  )
}
