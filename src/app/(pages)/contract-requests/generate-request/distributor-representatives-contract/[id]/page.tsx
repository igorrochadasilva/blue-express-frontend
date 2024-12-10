import { getUserSession } from '@/actions/auth/getUserSession';
import { Container } from '@/components/Container/Container';
import { RequestsTitleEnum } from '@/types/requests/enums';
import { getDistributorRepresentativesById } from '@/actions/requests/distributor-representatives-contract/getDistributorRepresentativesContractById';
import { DistributorRepresentativesContractId } from './components/DistributorRepresentativesContractId';

interface DistributorRepresentativesContractIdPageProps {
  params: { id: string };
}

export default async function DistributorRepresentativesContractIdPage({
  params,
}: DistributorRepresentativesContractIdPageProps) {
  const { id } = params;
  const user = await getUserSession();
  const distributorRepresentativesContractData =
    await getDistributorRepresentativesById(id);

  return (
    <Container
      title={`${RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT} -  ${String(distributorRepresentativesContractData?.data?.request.id)}`}
    >
      <DistributorRepresentativesContractId
        user={user}
        distributorRepresentativesContractData={
          distributorRepresentativesContractData?.data?.request
        }
      />
    </Container>
  );
}
