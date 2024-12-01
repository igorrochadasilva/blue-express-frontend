'use server';

import Container from '../../../../components/Global/Container/Container';
import NewApproverContent from '../../../../components/Pages/NewApprover/NewApproverContent';
import { getUsers } from '@/actions/user/getUsers';

export default async function NewApprover() {
  const usersData = await getUsers();

  return (
    <Container
      title="New Approver"
      btnNavigateLink="/approver/new-approver"
      btnNavigateText="New Approver"
    >
      <NewApproverContent usersData={usersData?.data ?? []} />
    </Container>
  );
}
