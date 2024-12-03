import { getUserSession } from '@/actions/auth/getUserSession';
import Container from '@/components/Global/Container/Container';
import { RequestsTitleEnum } from '@/types/requests/enums';
import { MaintenanceContract } from './components/MaintenanceContract';
import { MCFormDataInputs } from '@/libs/Forms/MaintenanceContractFormInputs';

export default async function MaintenanceContractPage() {
  const user = await getUserSession();

  return (
    <Container title={RequestsTitleEnum.MAINTENANCE_CONTRACT}>
      <MaintenanceContract
        user={user}
        FormDataInputs={MCFormDataInputs}
        createRequestRouter={RequestsTitleEnum.MAINTENANCE_CONTRACT}
      />
    </Container>
  );
}
