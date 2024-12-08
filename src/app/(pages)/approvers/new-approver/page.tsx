'use server';

import { getUsers } from '@/actions/user/getUsers';
import { NewApprover } from './components/NewApprover';
import Container from '@/components/Container/Container';

export default async function NewApproverPage() {
  const usersData = await getUsers();

  return (
    <Container
      title="New Approver"
      btnNavigateLink="/approver/new-approver"
      btnNavigateText="New Approver"
    >
      <NewApprover usersData={usersData?.data ?? []} />
    </Container>
  );
}
