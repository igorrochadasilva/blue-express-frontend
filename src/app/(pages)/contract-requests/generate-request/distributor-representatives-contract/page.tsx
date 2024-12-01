import { getUserSession } from '../../../../../actions/auth/getUserSession';
import Container from '../../../../../components/Global/Container/Container';
import RequestContent from '../../../../../components/Pages/Requests/RequestContent';
import { DRCFormDataInputs } from '../../../../../libs/DRCFormDataInputs';

export default async function DistributorRepresentativeContract() {
  const user = await getUserSession();

  return (
    <Container title="Distributor Representative Contract">
      <RequestContent
        user={user}
        FormDataInputs={DRCFormDataInputs}
        createRequestRouter="distributor-representatives-contract"
      />
    </Container>
  );
}
