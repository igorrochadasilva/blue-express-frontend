import Container from '../../../components/Global/Container/Container';
import ApproverContent from '../../../components/Pages/Approvers/ApproverContent';
import Content from '../../../components/Global/Content/Content';
import NoDataBox from '../../../components/Global/NoDataBox/NoDataBox';
import { getApprovers } from '@/actions/approver/getApprovers';
import { getUserSession } from '@/actions/auth/getUserSession';

export default async function Approvers() {
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
          <ApproverContent approversData={allApprovers.data} user={user} />
        </Content>
      ) : (
        <NoDataBox text="There are no approvers to show..." />
      )}
    </Container>
  );
}
