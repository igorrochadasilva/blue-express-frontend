'use client'

import { useEffect, useState } from 'react'
import { IRequestBody } from '../../../types/global/types'
import Content from '../../Global/Content/Content'
import InputsFilter from '../../Global/InputsFilter'
import ContractsList from './ContractsList/ContractsList'
import { notifyError } from '../../../toast/notifications'

interface IContractRequestContent {
  requestsData: {
    requests: IRequestBody[]
    message: string
  }
}

const ContractRequestContent = ({ requestsData }: IContractRequestContent) => {
  const { requests, message } = requestsData
  const [filteredRequests, setFilteredRequests] = useState<IRequestBody[]>([])
  const [selectRequestIdValue, setSelectRequestIdValue] = useState<string>('')
  const [selectRequestStatusValue, setSelectRequestStatusValue] = useState<string>('')

  const filterRequests = () => {
    let filteredRequests: IRequestBody[] = requests

    if (selectRequestIdValue) {
      filteredRequests = filteredRequests.filter((request: IRequestBody) =>
        request.requestId.toLowerCase().includes(selectRequestIdValue.toLowerCase())
      )
    }

    if (selectRequestStatusValue) {
      filteredRequests = filteredRequests.filter((request: IRequestBody) => request.status === selectRequestStatusValue)
    }

    setFilteredRequests(filteredRequests)
  }

  const handleSelectRequestIdChange = (value: string) => {
    setSelectRequestIdValue(value)
  }

  const handleSelectRequestStatusChange = (value: string) => {
    setSelectRequestStatusValue(value)
  }

  useEffect(() => {
    if (requests.length > 0) {
      if (!selectRequestIdValue && !selectRequestStatusValue) {
        setFilteredRequests(requests)
      } else {
        filterRequests()
      }
    } else {
      notifyError(message)
    }
  }, [requests, selectRequestIdValue, selectRequestStatusValue])

  return (
    <Content>
      <InputsFilter.Root>
        <InputsFilter.FilterRequestId handleSelectRequestIdChange={handleSelectRequestIdChange} />
        <InputsFilter.FilterStatus handleSelectRequestStatusChange={handleSelectRequestStatusChange} />
        <InputsFilter.CloseExpiration />
        <InputsFilter.BtnIssueReport />
      </InputsFilter.Root>
      <ContractsList requests={filteredRequests} />
    </Content>
  )
}
export default ContractRequestContent
