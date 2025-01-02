import { Container } from '@/components/Container/Container';
import { Button } from './components/Button';

export default function GenerateContractsPage() {
  return (
    <Container title="Generate Contracts">
      <div className="mt-10 rounded flex justify-between items-center gap-6">
        <Button
          text="Maintenance Contract"
          link={'/contract-requests/generate-request/maintenance-contract'}
        />
        <Button
          text="Software Service Contract"
          link={'/contract-requests/generate-request/software-service-contract'}
        />
        <Button
          text="Distributor Representative Contract"
          link={
            '/contract-requests/generate-request/distributor-representatives-contract'
          }
        />
      </div>
    </Container>
  );
}
