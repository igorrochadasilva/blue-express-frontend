import Container from '../../../../../components/Global/Container/Container';
import { SSCFormDataInputs } from '../../../../../libs/Forms/SoftwareServiceFormInputs';
import RequestContent from '../../../../../components/Pages/Requests/RequestContent';
import { getUserSession } from '../../../../../actions/auth/getUserSession';

export default async function SoftwareServiceContract() {
  const user = await getUserSession();

  return (
    <Container title="Software Service Contract">
      <RequestContent
        user={user}
        FormDataInputs={SSCFormDataInputs}
        createRequestRouter="software-service-contract"
      />
    </Container>
  );
}
