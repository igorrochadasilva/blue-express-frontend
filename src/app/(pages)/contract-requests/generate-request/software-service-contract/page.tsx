import { getUserSession } from '@/actions/auth/getUserSession';
import { SoftwareServiceContract } from './components/SoftwareServiceContract';
import Container from '@/components/Container/Container';

export default async function SoftwareServiceContractPage() {
  const user = await getUserSession();

  return (
    <Container title="Software Service Contract">
      <SoftwareServiceContract userSession={user} />
    </Container>
  );
}
