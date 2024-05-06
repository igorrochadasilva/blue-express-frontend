'use client'

import { useEffect, useState } from 'react'
import { IRequestBody } from '../../../types/global/types'
import PeriodFilter from './PeriodFilter/PeriodFilter'
import Content from '../../Global/Content/Content'
import RequestsChart from './RequestsChart/RequestsChart'
import RequestsList from './RequestsList/RequestsList'

interface IDashBoardContent {
  requests: IRequestBody[]
}

const DashBoardContent = ({ requests }: IDashBoardContent) => {
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

  return (
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
  )
}
export default DashBoardContent
