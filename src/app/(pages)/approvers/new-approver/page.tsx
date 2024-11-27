'use server';

import { getUserSession } from '../../../../actions/auth/getUserSession';
import { listUsers } from '../../../../actions/user';
import Container from '../../../../components/Global/Container/Container';
import NewApproverContent from '../../../../components/Pages/NewApprover/NewApproverContent';
import { TUser } from '../../../../types/global/types';

export default async function NewApprover() {
  const user: TUser = await getUserSession();
  const usersData = await listUsers(user?.accessToken);
  const { status, data, message } = usersData;

  const usersName = data?.map((user: any) => ({
    value: user.id,
    label: user.name,
  }));

  if (status !== 200) {
    throw message;
  }

  return (
    <Container
      title="New Approver"
      btnNavigateLink="/approver/new-approver"
      btnNavigateText="New Approver"
    >
      <NewApproverContent user={user} usersName={usersName} />
    </Container>
  );
}
