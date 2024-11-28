import Container from '../../../components/Global/Container/Container';
import { TApprover, TUser } from '../../../types/global/types';
import { listApprovers } from '../../../actions/approvers';
import { formatToUSD } from '../../../libs/utils';
import ApproverContent from '../../../components/Pages/Approvers/ApproverContent';
import Content from '../../../components/Global/Content/Content';
import NoDataBox from '../../../components/Global/NoDataBox/NoDataBox';
import { getUserSession } from '../../../actions/auth/getUserSession';

export default async function Approvers() {
  const user: TUser = await getUserSession();

  const allApprovers = await listApprovers(user?.accessToken);

  const { status, data, message } = allApprovers;

  if (status !== 200) {
    throw message;
  }

  const approversData = data?.map((approver: TApprover) => {
    return {
      type: approver.title,
      competence: formatToUSD(Number(approver.competence)),
      approverName: approver.approverName,
      level: approver.level,
      companyType: approver.company,
      id: approver.id,
    };
  });

  return (
    <Container
      title="Approver"
      btnNavigateLink="/approvers/new-approver"
      btnNavigateText="New Approver"
      showBtnNavigate
    >
      {approversData.length > 0 ? (
        <Content>
          <ApproverContent approversData={approversData} user={user} />
        </Content>
      ) : (
        <NoDataBox text="There are no approvers to show..." />
      )}
    </Container>
  );
}
