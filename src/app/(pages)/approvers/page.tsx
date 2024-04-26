'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Container from '../../../components/Global/Container/Container'
import Content from '../../../components/Global/Content/Content'
import { IApprover, TApprover, TUser } from '../../../types/global/types'
import { deleteApprover, listApprovers } from '../../../actions/approvers'
import Modal from '../../../components/Global/Modal/Modal'
import ApproversList from '../../../components/Pages/Approvers/ApproverList'
import { formatToUSD } from '../../../libs/utils'

export default function Approvers() {
  const { data: session, status } = useSession()
  const [approvers, setApproves] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showTrashModal, setShowTrashModal] = useState<boolean>(false)
  const [selectedApproverId, setSelectedApproverId] = useState<number>()

  const user: TUser = session?.user

  useEffect(() => {
    const fetchData = async () => {
      const allApprovers = await listApprovers(user?.accessToken)

      if (allApprovers) {
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

        setApproves(approversData)
        setIsLoading(false)
      }
    }

    status === 'authenticated' && fetchData()
  }, [status])

  const handleTrashClick = (id: number) => {
    setShowTrashModal(true)
    setSelectedApproverId(id)
  }

  const handleDeleteApprover = () => {
    if (selectedApproverId) {
      const approversDataFiltered = approvers.filter((approver: IApprover) => approver.id !== selectedApproverId)
      setApproves(approversDataFiltered)
      deleteApprover(selectedApproverId, user?.accessToken)
      setShowTrashModal(false)
    }
  }

  return (
    <Container title="Approver" btnNavigateLink="/approver/new-approver" btnNavigateText="New Approver" showBtnNavigate>
      <Content showStyleContent={false}>
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">Loading...</div>
        ) : (
          <>
            <ApproversList.Root>
              {approvers.length > 0 ? (
                <table>
                  <ApproversList.Head />
                  <ApproversList.Content approversData={approvers} handleTrashClick={handleTrashClick} />
                </table>
              ) : (
                <ApproversList.Message text="No approvers registered..." />
              )}
            </ApproversList.Root>
            <Modal
              text="Are you sure you want to delete this approver?"
              showModal={showTrashModal}
              setCloseModal={() => setShowTrashModal(false)}
              action={handleDeleteApprover}
            />
          </>
        )}
      </Content>
    </Container>
  )
}
