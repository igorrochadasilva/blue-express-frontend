import Container from '../../../components/Global/Container/Container'
import ContractRequestContent from '../../../components/Pages/ContractRequests/ContractRequestContent'
import { getRequests } from '../../../actions/auth'

export default async function ContractRequests() {
  const requests = await getRequests()

  return (
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
      <ContractRequestContent requests={requests} />
    </Container>
  )
}
