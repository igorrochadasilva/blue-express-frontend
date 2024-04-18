'use client'

import Container from '../../../components/Global/Container/Container'
import Content from '../../../components/Global/Content/Content'
import StatusInput from '../../../components/Global/InputsFilter/StatusInput'
import PeriodStatus from '../../../components/Global/InputsFilter/PeriodInput'
import CloseExpirationInput from '../../../components/Global/InputsFilter/CloseExpirationInput'
import ContractsList from '../../../components/Pages/ContractRequests/ContractsList'
import useRequestData from '../../../hooks/UseRequestData'
import BtnIssueReport from '../../../components/Global/BtnIssueReport/BtnIssueReport'

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
        <div className="flex flex-row gap-4 mb-12 items-center text-sm">
          <StatusInput />
          <PeriodStatus />
          <CloseExpirationInput />
          <div className="flex justify-end flex-1">
            <BtnIssueReport />
          </div>
        </div>
        <ContractsList requests={requests} />
      </Content>
    </Container>
  )
}
