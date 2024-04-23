import { useEffect, useState } from 'react'
import { IRequestBody } from '../../../types/global/types'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { formatApproverName, generateRouteForId } from '../../../libs/utils'

interface IContractsList {
  requests: IRequestBody[]
}

interface IRequest {
  id: string
  type: string
  status: string
  statusColor: string
  validity: string
  requestId: string
  level: number
  approver: string
  order: number
  link: string
}

const ContractsList = ({ requests }: IContractsList) => {
  const [listRequests, setListRequests] = useState<any>()

  useEffect(() => {
    const data = requests.map((request, index) => {
      const statusColor =
        {
          approved: '#00D134',
          disapproved: '#EB1400',
          'waiting for approval': '#F3AF25',
          'waiting for information': '#F3AF25',
          sketch: '#98A4AE',
        }[request.status] || '#ccc'

      let validity =
        request.title === 'Distributor Representatives Contract' ? request.endContractDate : request.renewEndDate

      const formattedApprovers = formatApproverName(request.currentApproverName)

      const requestLink = generateRouteForId(request.requestId, request.id)

      return {
        id: request.id,
        type: request.title,
        status: request.status,
        statusColor: statusColor,
        validity,
        requestId: request.requestId,
        level: request.currentLevel,
        approver: formattedApprovers,
        order: index,
        link: requestLink,
      }
    })

    setListRequests(data)
  }, [])

  return (
    <div className="flex flex-col text-sm">
      <div className="flex flex-col justify-normal">
        <table>
          <thead className="h-16 bg-[#F8F8F8]">
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Validity</th>
              <th>Request ID</th>
              <th>Level</th>
              <th>Approver</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listRequests &&
              listRequests.map((request: IRequest) => {
                return (
                  <tr key={request.order} className="text-center">
                    <td className="w-1/7 py-3 w-48">{request.type}</td>
                    <td style={{ color: `${request.statusColor}` }} className="w-1/7 py-3">
                      {request.status}
                    </td>
                    <td className="w-1/7 py-3">{request.validity}</td>
                    <td className="w-1/7 py-3">{request.requestId}</td>
                    <td className="w-1/7 py-3">{request.level}</td>
                    <td className="w-1/7 py-3">{request.approver}</td>
                    <td className="w-1/7 py-3">
                      <Link href={request.link}>
                        <ArrowTopRightOnSquareIcon className="h-5" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ContractsList
