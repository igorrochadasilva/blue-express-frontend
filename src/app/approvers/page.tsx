'use client'

import { useEffect, useState } from 'react'
import Container from '../../components/Global/Container/Container'
import Content from '../../components/Global/Content/Content'
import ApproversList from '../../components/Pages/Approvers/ApproversList/ApproversList'
import { listApprovers } from '../../actions/approvers'

export default function Approvers() {
  const [approvers, setListApprover] = useState<any>()
  const [loadingApprovers, setLoadingRequests] = useState(true)

  useEffect(() => {
    const getAllApprovers = async () => {
      const allApprovers = await listApprovers()

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
          <ApproversList approvers={approvers} />
        )}
      </Content>
    </Container>
  )
}
