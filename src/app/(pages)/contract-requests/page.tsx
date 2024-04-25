'use client'

import Container from '../../../components/Global/Container/Container'
import Content from '../../../components/Global/Content/Content'
import ContractsList from '../../../components/Pages/ContractRequests/ContractsList'
import useRequestData from '../../../hooks/UseRequestData'
import InputsFilter from '../../../components/Global/InputsFilter'

export default function ContractRequests(): JSX.Element {
  const { requests, isLoading } = useRequestData()

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
          <InputsFilter.Period />
          <InputsFilter.Status />
          <InputsFilter.CloseExpiration />
          <InputsFilter.BtnIssueReport />
        </InputsFilter.Root>
        <ContractsList requests={requests} />
      </Content>
    </Container>
  )
}
