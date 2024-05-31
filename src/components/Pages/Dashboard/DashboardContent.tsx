'use client'

import { useEffect, useState } from 'react'
import { IRequestBody } from '../../../types/global/types'
import PeriodFilter from './PeriodFilter/PeriodFilter'
import Content from '../../Global/Content/Content'
import RequestsChart from './RequestsChart/RequestsChart'
import RequestsList from './RequestsList/RequestsList'
import { notifyError } from '../../../toast/notifications'
import NoDataBox from '../../Global/NoDataBox/NoDataBox'

interface IDashBoardContent {
  requestsData: IRequestBody[]
}

const DashBoardContent = ({ requestsData }: IDashBoardContent) => {
  const [filteredRequests, setFilteredRequests] = useState<IRequestBody[]>([])
  const [selectPeriodValue, setSelectPeriodValue] = useState<string>('')

  const filterRequestByPeriod = () => {
    if (selectPeriodValue !== 'all') {
      const days = Number(selectPeriodValue)
      const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

      const filterRequests = requestsData.filter((request: IRequestBody) => {
        const requestDate = new Date(request.createdAt)
        return requestDate >= thresholdDate
      })

      setFilteredRequests(filterRequests)
    } else {
      setFilteredRequests(requestsData)
    }
  }

  const handleSelectPeriodChange = (value: string) => setSelectPeriodValue(value)

  useEffect(() => {
    if (requestsData.length > 0) {
      selectPeriodValue ? filterRequestByPeriod() : setFilteredRequests(requestsData)
    }
  }, [requestsData, selectPeriodValue])

  return (
    <>
      <PeriodFilter handleSelectPeriodChange={handleSelectPeriodChange} />
      <Content>
        <RequestsChart requests={filteredRequests} />
      </Content>
      <Content>
        <RequestsList requests={filteredRequests} />
      </Content>
    </>
  )
}
export default DashBoardContent
