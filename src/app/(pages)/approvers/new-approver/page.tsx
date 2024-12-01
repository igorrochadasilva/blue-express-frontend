'use server';

import { UserSession } from '@/types/auth/sign';
import { getUserSession } from '../../../../actions/auth/getUserSession';
import { listUsers } from '../../../../actions/user';
import Container from '../../../../components/Global/Container/Container';
import NewApproverContent from '../../../../components/Pages/NewApprover/NewApproverContent';
import { UserNames } from '@/types/approvers/newApprover';

export default async function NewApprover() {
  const userSession: UserSession = await getUserSession();
  const usersData = await listUsers(userSession?.accessToken);

  const usersName: UserNames[] = usersData?.data?.map((user: UserSession) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <Container
      title="New Approver"
      btnNavigateLink="/approver/new-approver"
      btnNavigateText="New Approver"
    >
      <NewApproverContent user={userSession} usersName={usersName} />
    </Container>
  );
}
