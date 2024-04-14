'use client'

import { useEffect, useState } from 'react'
import Container from '../../../components/Global/Container/Container'
import Content from '../../../components/Global/Content/Content'
import ApproversList from '../../../components/Pages/Approvers/ApproversList'
import { listApprovers } from '../../../actions/approvers'
import { TUser } from '../../../types/global/types'
import { useSession } from 'next-auth/react'

export default function Approvers() {
  const [approvers, setListApprover] = useState<any>()
  const [loadingApprovers, setLoadingRequests] = useState(true)
  const { data: session, status } = useSession()

  const user: TUser = session?.user

  useEffect(() => {
    const getAllApprovers = async () => {
      const allApprovers = await listApprovers(user?.accessToken)

      if (allApprovers) {
        setListApprover(allApprovers)
        setLoadingRequests(false)
      }
    }

    getAllApprovers()
  }, [])

  return (
    <Container title="Approver" btnNavigateLink="/approver/new-approver" btnNavigateText="New Approver" showBtnNavigate>
      <Content showStyleContent={false}>
        {loadingApprovers ? (
          <div className="flex items-center justify-center h-[400px]">Loading...</div>
        ) : (
          <ApproversList approvers={approvers} token={user?.accessToken} />
        )}
      </Content>
    </Container>
  )
}
