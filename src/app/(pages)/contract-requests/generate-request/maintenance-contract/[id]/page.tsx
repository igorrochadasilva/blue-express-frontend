import { getUserSession } from '@/actions/auth/getUserSession';
import Container from '@/components/Global/Container/Container';
import { MaintenanceContractId } from './components/MaitenanceContractId';
import { getMaintenanceContractById } from '@/actions/requests/maintenance-contract/getMaintenanceContractById';

interface MaintenanceContractIdPageProps {
  params: { id: string };
}

export default async function MaintenanceContractIdPage({
  params,
}: MaintenanceContractIdPageProps) {
  const user = await getUserSession();
  const { id } = params;
  const maintenanceContractData = await getMaintenanceContractById(id);

  return (
    <Container title={String(maintenanceContractData?.data?.id)}>
      <MaintenanceContractId
        user={user}
        maintenanceContractData={maintenanceContractData.data}
      />
    </Container>
  );
}
