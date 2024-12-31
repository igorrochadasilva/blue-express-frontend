import { getUserSession } from '@/actions/auth/getUserSession';
import { Container } from '@/components/Container/Container';
import { MaintenanceContractId } from './components/MaitenanceContractId';
import { getMaintenanceContractById } from '@/actions/requests/maintenance-contract/getMaintenanceContractById';
import { RequestsTitleEnum } from '@/types/requests/enums';

interface MaintenanceContractIdPageProps {
  params: { id: string };
}

export default async function MaintenanceContractIdPage({
  params,
}: MaintenanceContractIdPageProps) {
  const { id } = params;
  const user = await getUserSession();
  const maintenanceContractData = await getMaintenanceContractById(id);

  return (
    <Container
      title={`${RequestsTitleEnum.MAINTENANCE_CONTRACT} -  ${String(maintenanceContractData?.data?.request.id)}`}
    >
      <MaintenanceContractId
        user={user}
        maintenanceContractData={maintenanceContractData?.data?.request}
      />
    </Container>
  );
}
