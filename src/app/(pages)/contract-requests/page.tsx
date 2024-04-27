'use client'

import Container from '../../../components/Global/Container/Container'
import Content from '../../../components/Global/Content/Content'
import ContractsList from '../../../components/Pages/ContractRequests/ContractsList'
import useRequestData from '../../../hooks/UseRequestData'
import InputsFilter from '../../../components/Global/InputsFilter'
import { useEffect, useState } from 'react'
import { IRequestBody } from '../../../types/global/types'

export default function ContractRequests(): JSX.Element {
  const { requests, isLoading } = useRequestData()
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
    if (!selectRequestIdValue && !selectRequestStatusValue) {
      setFilteredRequests(requests)
    } else {
      filterRequests()
    }
  }, [requests, selectRequestIdValue, selectRequestStatusValue])

  return isLoading ? (
    <Container title="Loading..."></Container>
  ) : (
    <Container
      title="Contract Requests"
      showBtnNavigate
      btnNavigateLink="/contract-requests/generate-request"
      btnNavigateText="Generate Contracts"
      btnBgColor="bg-white"
      btnTextColor="text-be_first_color"
      btnBorderColor="border-be_first_color"
      btnBgHover="bg-slate-300"
    >
      <Content>
        <InputsFilter.Root>
          <InputsFilter.FilterRequestId handleSelectRequestIdChange={handleSelectRequestIdChange} />
          <InputsFilter.FilterStatus handleSelectRequestStatusChange={handleSelectRequestStatusChange} />
          <InputsFilter.CloseExpiration />
          <InputsFilter.BtnIssueReport />
        </InputsFilter.Root>
        <ContractsList requests={filteredRequests} />
      </Content>
    </Container>
  )
}
