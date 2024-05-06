import Container from '../../../../../../components/Global/Container/Container'
import { SSCFormDataInputs } from '../../../../../../libs/SSCFormDataInputs'
import { getRequest } from '../../../../../../actions/requests'
import { getUserSession } from '../../../../../../actions/auth'
import DynamicRequestContent from '../../../../../../components/Pages/DynamicRequest/DynamicRequestContent'

interface ISoftwareServiceContractRequest {
  params: { id: string }
}

export default async function SoftwareServiceContractRequest({ params }: ISoftwareServiceContractRequest) {
  const user = await getUserSession()
  const { id } = params
  const requestData = await getRequest('software-service-contract', id)

  return (
    <Container title={requestData?.requestId}>
      {requestData ? (
        <DynamicRequestContent
          user={user}
          requestData={{ ...requestData.request, files: requestData.files }}
          FormDataInputs={SSCFormDataInputs}
          requestRouteType={'software-service-contract'}
        />
      ) : null}
    </Container>
  )
}
