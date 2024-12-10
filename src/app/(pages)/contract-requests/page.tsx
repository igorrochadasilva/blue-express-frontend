'use server';

import { Container } from '@/components/Container/Container';
import { getRequests } from '@/hooks/useGetRequests';
import ContractRequest from './components/ContractRequest';
import { NoDataBox } from '@/components/NoDataBox/NoDataBox';

export default async function ContractRequestsPage() {
  const requestsData = await getRequests();

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
      {requestsData.length > 0 ? (
        <ContractRequest requestsData={requestsData} />
      ) : (
        <NoDataBox text="There are no requests to show..." />
      )}
    </Container>
  );
}
