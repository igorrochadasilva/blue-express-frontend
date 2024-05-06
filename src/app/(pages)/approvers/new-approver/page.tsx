'use server'

import { getUserSession } from '../../../../actions/auth'
import { listUsers } from '../../../../actions/user'
import Container from '../../../../components/Global/Container/Container'
import NewApproverContent from '../../../../components/Pages/NewApprover/NewApproverContent'
import { TUser } from '../../../../types/global/types'

export default async function NewApprover() {
  const user: TUser = await getUserSession()
  const users = await listUsers(user?.accessToken)
  const usersName = users.map((user: any) => {
    return { value: user.id, label: user.name }
  })

  return (
    <Container title="New Approver" btnNavigateLink="/approver/new-approver" btnNavigateText="New Approver">
      <NewApproverContent user={user} usersName={usersName} />
    </Container>
  )
}
