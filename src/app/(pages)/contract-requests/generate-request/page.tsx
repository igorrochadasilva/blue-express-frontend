import Container from '../../../../components/Global/Container/Container';
import GenerateRequest from '../../../../components/Pages/GenerateRequest';

export default async function GenerateContracts() {
  return (
    <Container title="Generate Contracts">
      <GenerateRequest.Root>
        <GenerateRequest.Button
          text="Maintenance Contract"
          link={'/contract-requests/generate-request/maintenance-contract'}
        />
        <GenerateRequest.Button
          text="Software Service Contract"
          link={'/contract-requests/generate-request/software-service-contract'}
        />
        <GenerateRequest.Button
          text="Distributor Representative Contract"
          link={
            '/contract-requests/generate-request/distributor-representatives-contract'
          }
        />
      </GenerateRequest.Root>
    </Container>
  );
}
