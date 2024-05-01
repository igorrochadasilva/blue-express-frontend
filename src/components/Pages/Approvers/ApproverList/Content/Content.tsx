import { IApprover } from '../../../../../types/global/types'
import { TrashIcon } from '@heroicons/react/24/solid'

interface IContentProps {
  approversData: IApprover[]
  handleTrashClick: (id: number) => void
}

const Content = ({ approversData, handleTrashClick }: IContentProps) => {
  return (
    <tbody>
      {approversData.map((approver: IApprover) => (
        <tr key={approver.id} className="text-center border text-sm whitespace-nowrap">
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
      ))}
    </tbody>
  )
}

export default Content
