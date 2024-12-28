import { getApprovers } from '@/actions/approver/getApprovers';
import { getUserSession } from '@/actions/auth/getUserSession';
import { Container } from '@/components/Container/Container';
import { Content } from '@/components/Content/Content';
import { NoDataBox } from '@/components/NoDataBox/NoDataBox';
import { Approvers } from './components/Approver';

export default async function ApproversPage() {
  const allApprovers = await getApprovers();
  const user = await getUserSession();

  return (
    <Container
      title="Approver"
      btnNavigateLink="/approvers/new-approver"
      btnNavigateText="New Approver"
      showBtnNavigate
    >
      {allApprovers.data.length > 0 ? (
        <Content>
          <Approvers approversData={allApprovers.data} user={user} />
        </Content>
      ) : (
        <NoDataBox text="There are no approvers to show..." />
      )}
    </Container>
  );
}
