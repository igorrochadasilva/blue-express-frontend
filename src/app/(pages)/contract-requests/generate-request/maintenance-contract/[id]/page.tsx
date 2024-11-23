import Container from '../../../../../../components/Global/Container/Container';
import { MCFormDataInputs } from '../../../../../../libs/MCFormDataInputs';
import { getRequest } from '../../../../../../actions/requests';
import { getUserSession } from '../../../../../../actions/auth';
import DynamicRequestContent from '../../../../../../components/Pages/DynamicRequest/DynamicRequestContent';

interface IMaintenanceContractRequest {
  params: { id: string };
}

export default async function MaintenanceContractRequest({
  params,
}: IMaintenanceContractRequest) {
  const user = await getUserSession();
  const { id } = params;
  const requestData = await getRequest('maintenance-contract', id);
  const { data } = requestData;

  return (
    <Container title={data?.requestId}>
      {data ? (
        <DynamicRequestContent
          user={user}
          requestData={{ ...data.request, files: data.files }}
          FormDataInputs={MCFormDataInputs}
          requestRouteType={'maintenance-contract'}
        />
      ) : null}
    </Container>
  );
}
