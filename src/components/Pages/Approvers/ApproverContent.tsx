'use client'

import { useState } from 'react'
import { IApprover, TUser } from '../../../types/global/types'
import ApproversList from './ApproverList'
import Modal from '../../Global/Modal/Modal'
import { deleteApprover } from '../../../actions/approvers'

interface IApproverContent {
  approversData: IApprover[]
  user: TUser
}

const ApproverContent = ({ approversData, user }: IApproverContent) => {
  const [approvers, setApproves] = useState(approversData)
  const [showTrashModal, setShowTrashModal] = useState<boolean>(false)
  const [selectedApproverId, setSelectedApproverId] = useState<number>(0)

  const handleTrashClick = (id: number) => {
    setShowTrashModal(true)
    setSelectedApproverId(id)
  }

  const handleDeleteApprover = () => {
    const approversDataFiltered = approvers.filter((approver: IApprover) => approver.id !== selectedApproverId)
    setApproves(approversDataFiltered)
    deleteApprover(selectedApproverId, user?.accessToken)
    setShowTrashModal(false)
  }

  return (
    <>
      <ApproversList.Root>
        <table>
          <ApproversList.Head />
          <ApproversList.Content approversData={approvers} handleTrashClick={handleTrashClick} />
        </table>
      </ApproversList.Root>
      <Modal
        text="Are you sure you want to delete this approver?"
        showModal={showTrashModal}
        setCloseModal={() => setShowTrashModal(false)}
        action={handleDeleteApprover}
      />
    </>
  )
}
export default ApproverContent
