import { useEffect } from 'react'
import { IApproverData } from '../../../../types/global/types'
import { v4 as uuid4 } from 'uuid'
interface IListContentProps {
  listApprovers: IApproverData[]
}

const ListContent = ({ listApprovers }: IListContentProps) => {
  return (
    <tbody>
      {listApprovers.map((approver) => (
        <tr className="whitespace-nowrap h-10 border-y-[1px]" key={uuid4()}>
          <td>{approver.title}</td>
          <td>{approver.approverName}</td>
          <td>{approver.level}</td>
          <td>{approver.competence}</td>
          <td>{approver.company}</td>
          <td>{approver.office}</td>
        </tr>
      ))}
    </tbody>
  )
}

export default ListContent
