import Container from '../../../../../../components/Global/Container/Container';
import { DRCFormDataInputs } from '../../../../../../libs/Forms/DistributionRepresentativesContractFormInputs';
import { getRequest } from '../../../../../../actions/requests';
import DynamicRequestContent from '../../../../../../components/Pages/DynamicRequest/DynamicRequestContent';
import { getUserSession } from '../../../../../../actions/auth/getUserSession';
import ErrorComponent from '../../../../../../components/Global/Error/Error';

interface IDistributorRepresentativeContractRequest {
  params: { id: string };
}

export default async function DistributorRepresentativeContractRequest({
  params,
}: IDistributorRepresentativeContractRequest) {
  const user = await getUserSession();
  const { id } = params;
  const requestData = await getRequest(
    'distributor-representatives-contract',
    id
  );

  const { status, data, message } = requestData;

  if (status !== 200) {
    return <ErrorComponent message={message} />;
  }

  return (
    <Container title={data?.requestId}>
      {data ? (
        <DynamicRequestContent
          user={user}
          requestData={{ ...data.request, files: data.files }}
          FormDataInputs={DRCFormDataInputs}
          requestRouteType={'distributor-representatives-contract'}
        />
      ) : null}
    </Container>
  );
}
