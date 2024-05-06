import Container from '../../../../../../components/Global/Container/Container'
import { DRCFormDataInputs } from '../../../../../../libs/DRCFormDataInputs'
import { getRequest } from '../../../../../../actions/requests'
import DynamicRequestContent from '../../../../../../components/Pages/DynamicRequest/DynamicRequestContent'
import { getUserSession } from '../../../../../../actions/auth'

interface IDistributorRepresentativeContractRequest {
  params: { id: string }
}

export default async function DistributorRepresentativeContractRequest({
  params,
}: IDistributorRepresentativeContractRequest) {
  const user = await getUserSession()
  const { id } = params
  const requestData = await getRequest('distributor-representatives-contract', id)

  return (
    <Container title={requestData?.requestId}>
      {requestData ? (
        <DynamicRequestContent
          user={user}
          requestData={{ ...requestData.request, files: requestData.files }}
          FormDataInputs={DRCFormDataInputs}
          requestRouteType={'distributor-representatives-contract'}
        />
      ) : null}
    </Container>
  )
}
