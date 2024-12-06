import { getUserSession } from '@/actions/auth/getUserSession';
import { getRequest } from '@/actions/requests';
import Container from '@/components/Global/Container/Container';
import DynamicRequestContent from '@/components/Pages/DynamicRequest/DynamicRequestContent';
import { MaintenanceContractFormInputs } from '@/libs/Forms/MaintenanceContractFormInputs';

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
          FormDataInputs={MaintenanceContractFormInputs}
          requestRouteType={'maintenance-contract'}
        />
      ) : null}
    </Container>
  );
}
