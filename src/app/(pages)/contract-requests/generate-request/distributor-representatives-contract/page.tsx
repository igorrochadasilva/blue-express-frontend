import { getUserSession } from '@/actions/auth/getUserSession';
import Container from '@/components/Container/Container';
import { RequestsTitleEnum } from '@/types/requests/enums';
import { DistributorRepresentativesContract } from './components/DistributorRepresentativesContract';

export default async function DistributorRepresentativeContractPage() {
  const user = await getUserSession();

  return (
    <Container title={RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT}>
      <DistributorRepresentativesContract userSession={user} />
    </Container>
  );
}
