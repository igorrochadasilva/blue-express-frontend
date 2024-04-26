import { useEffect, useState } from 'react'
import { formatToUSD } from '../../../../libs/utils'
import { TrashIcon } from '@heroicons/react/24/solid'
import Modal from '../../../Global/Modal/Modal'
import { deleteApprover } from '../../../../actions/approvers'
import { IApprover, TApprover } from '../../../../types/global/types'

interface IApproversList {
  approvers: TApprover[]
  token: string | undefined
}

const ApproversList = ({ approvers, token }: IApproversList) => {
  const [listApprover, setListApprover] = useState<any>([])
  const [showTrashModal, setShowTrashModal] = useState<boolean>(false)
  const [selectedApproverId, setSelectedApproverId] = useState<number>()

  useEffect(() => {
    const data = approvers.map((approver: TApprover) => {
      return {
        type: approver.title,
        competence: formatToUSD(Number(approver.competence)),
        approverName: approver.approverName,
        level: approver.level,
        companyType: approver.company,
        id: approver.id,
      }
    }, [])

    setListApprover(data)
  }, [])

  const handleTrashClick = (id: number) => {
    setShowTrashModal(true)
    setSelectedApproverId(id)
  }

  const handleDeleteApprover = () => {
    if (selectedApproverId) {
      const data = listApprover.filter((approver: IApprover) => approver.id !== selectedApproverId)
      setListApprover(data)
      deleteApprover(selectedApproverId, token)
      setShowTrashModal(false)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-normal">
        {listApprover.length > 0 ? (
          <table>
            <thead>
              <tr className="h-14">
                <th>Request Type</th>
                <th>competence</th>
                <th>Approver</th>
                <th>Level</th>
                <th>Company Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listApprover.map((approver: IApprover) => {
                return (
                  <tr key={approver.id} className="text-center border text-sm">
                    <td className="w-1/6 py-3 pl-3">{approver.type}</td>
                    <td className="w-1/6 py-3">{approver.competence}</td>
                    <td className="w-1/6 py-3">{approver.approverName}</td>
                    <td className="w-1/6 py-3">{approver.level}</td>
                    <td className="w-1/6 py-3">{approver.companyType}</td>
                    <td className="w-1/6 py-3">
                      <TrashIcon
                        onClick={() => handleTrashClick(approver.id)}
                        className="text-center w-4 cursor-pointer text-red-500 m-auto"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center w-full h-[400px]">
            <p>There are no approved approvers...</p>
          </div>
        )}
      </div>
      <Modal
        text="Are you sure you want to delete this approver?"
        showModal={showTrashModal}
        setCloseModal={() => setShowTrashModal(false)}
        action={handleDeleteApprover}
      />
    </>
  )
}
export default ApproversList
