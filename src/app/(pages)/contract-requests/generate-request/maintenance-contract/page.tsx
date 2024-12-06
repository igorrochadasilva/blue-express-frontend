import { getUserSession } from '@/actions/auth/getUserSession';
import Container from '@/components/Global/Container/Container';
import { RequestsTitleEnum } from '@/types/requests/enums';
import { MaintenanceContract } from './components/MaintenanceContract';

export default async function MaintenanceContractPage() {
  const user = await getUserSession();

  return (
    <Container title={RequestsTitleEnum.MAINTENANCE_CONTRACT}>
      <MaintenanceContract userSession={user} />
    </Container>
  );
}
