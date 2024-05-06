'use server'

import Container from '../../../components/Global/Container/Container'
import { TApprover, TUser } from '../../../types/global/types'
import { listApprovers } from '../../../actions/approvers'
import { formatToUSD } from '../../../libs/utils'
import { getUserSession } from '../../../actions/auth'
import ApproverContent from '../../../components/Pages/Approvers/ApproverContent'
import Content from '../../../components/Global/Content/Content'

export default async function Approvers() {
  const user: TUser = await getUserSession()

  const allApprovers = await listApprovers(user?.accessToken)

  const approversData = allApprovers.map((approver: TApprover) => {
    return {
      type: approver.title,
      competence: formatToUSD(Number(approver.competence)),
      approverName: approver.approverName,
      level: approver.level,
      companyType: approver.company,
      id: approver.id,
    }
  })

  return (
    <Container
      title="Approver"
      btnNavigateLink="/approvers/new-approver"
      btnNavigateText="New Approver"
      showBtnNavigate
    >
      <Content>
        <ApproverContent approversData={approversData} user={user} />
      </Content>
    </Container>
  )
}
