import Container from '../../../../../components/Global/Container/Container';
import { MCFormDataInputs } from '../../../../../libs/Forms/MaintenanceContractFormInputs';
import RequestContent from '../../../../../components/Pages/Requests/RequestContent';
import { getUserSession } from '../../../../../actions/auth/getUserSession';
import { RequestsTitleEnum } from '@/types/requests/enums';

export default async function MaintenanceContract() {
  const user = await getUserSession();

  return (
    <Container title={RequestsTitleEnum.MAINTENANCE_CONTRACT}>
      <RequestContent
        user={user}
        FormDataInputs={MCFormDataInputs}
        createRequestRouter={RequestsTitleEnum.MAINTENANCE_CONTRACT}
      />
    </Container>
  );
}
