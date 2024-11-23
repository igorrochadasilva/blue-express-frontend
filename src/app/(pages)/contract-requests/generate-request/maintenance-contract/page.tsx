import Container from '../../../../../components/Global/Container/Container';
import { MCFormDataInputs } from '../../../../../libs/MCFormDataInputs';
import RequestContent from '../../../../../components/Pages/Requests/RequestContent';
import { getUserSession } from '../../../../../actions/auth';

export default async function MaintenanceContract() {
  const user = await getUserSession();

  return (
    <Container title="Maintenance Contract">
      <RequestContent
        user={user}
        FormDataInputs={MCFormDataInputs}
        createRequestRouter="maintenance-contract"
      />
    </Container>
  );
}
