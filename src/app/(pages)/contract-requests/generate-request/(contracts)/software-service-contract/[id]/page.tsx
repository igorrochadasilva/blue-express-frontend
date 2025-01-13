import { getUserSession } from '@/services/auth/getUserSession';
import { Container } from '@/components/Container/Container';
import { RequestsTitleEnum } from '@/types/requests/enums';
import { getSoftwareServiceContractById } from '@/services/requests/software-service-contract/getSoftwareServiceContractById';
import { SoftwareServiceContractId } from './components/SoftwareServiceContractId';

interface SoftwareServiceContractIdPageProps {
  params: { id: string };
}

export default async function SoftwareServiceContractIdPage({
  params,
}: SoftwareServiceContractIdPageProps) {
  const { id } = params;
  const user = await getUserSession();
  const softwareServiceContractData = await getSoftwareServiceContractById(id);

  return (
    <Container
      title={`${RequestsTitleEnum.SOFTWARE_SERVICE_CONTRACT} -  ${String(softwareServiceContractData?.data?.request.id)}`}
    >
      <SoftwareServiceContractId
        user={user}
        softwareServiceContractData={softwareServiceContractData?.data?.request}
      />
    </Container>
  );
}
