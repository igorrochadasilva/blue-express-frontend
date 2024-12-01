import Container from '../../../../../../components/Global/Container/Container';
import { SSCFormDataInputs } from '../../../../../../libs/Forms/SoftwareServiceFormInputs';
import { getRequest } from '../../../../../../actions/requests';
import { getUserSession } from '../../../../../../actions/auth/getUserSession';
import DynamicRequestContent from '../../../../../../components/Pages/DynamicRequest/DynamicRequestContent';
import ErrorComponent from '../../../../../../components/Global/Error/Error';

interface ISoftwareServiceContractRequest {
  params: { id: string };
}

export default async function SoftwareServiceContract({
  params,
}: ISoftwareServiceContractRequest) {
  const user = await getUserSession();
  const { id } = params;
  const requestData = await getRequest('software-service-contract', id);
  const { status, data, message } = requestData;

  if (status !== 200) {
    return <ErrorComponent message={message} />;
  }

  return (
    <Container title={data?.requestId}>
      {requestData ? (
        <DynamicRequestContent
          user={user}
          requestData={{ ...data.request, files: data.files }}
          FormDataInputs={SSCFormDataInputs}
          requestRouteType={'software-service-contract'}
        />
      ) : null}
    </Container>
  );
}
