import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface IContentProps {
  order: number
  type: string
  statusColor: string
  status: string
  validity: string
  approver: string
  level: number
  requestId: string
  link: string
}

const Content = ({ order, type, statusColor, status, validity, approver, level, requestId, link }: IContentProps) => {
  return (
    <tr key={order} className="text-center">
      <td className="w-1/7 py-3 w-48">{type}</td>
      <td style={{ color: statusColor }} className="w-1/7 py-3">
        {status}
      </td>
      <td className="w-1/7 py-3">{validity}</td>
      <td className="w-1/7 py-3">{requestId}</td>
      <td className="w-1/7 py-3">{level}</td>
      <td className="w-1/7 py-3">{approver}</td>
      <td className="w-1/7 py-3">
        <Link href={link}>
          <ArrowTopRightOnSquareIcon className="h-5" />
        </Link>
      </td>
    </tr>
  )
}

export default Content
