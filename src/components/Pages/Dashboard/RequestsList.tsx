import { useEffect, useId, useState } from 'react'
import { calculateSLA, formatApproverName, formatDate, generateRouteForId } from '../../../libs/utils'
import { IRequestBody } from '../../../types/global/types'
import Link from 'next/link'

interface IRequestsList {
  requests: IRequestBody[]
}

interface IRequest {
  type: string
  status: string
  statusColor: string
  requestData: string
  requester: string
  approver: string
  SLA: string
  requestId: string
  id: string
  order: string
  link: string
}

const RequestsList = ({ requests }: IRequestsList) => {
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

      const formattedApprovers = request.currentApproverName ? formatApproverName(request.currentApproverName) : ''

      const requestLink = generateRouteForId(request.requestId, request.id)

      return {
        type: request.title,
        status: request.status,
        statusColor: statusColor,
        requestData: formatDate(request.createdAt),
        requester: request.requesterName,
        approver: formattedApprovers,
        SLA: calculateSLA(request.createdAt),
        requestId: request.requestId,
        order: index,
        link: requestLink,
      }
    })

    setListRequests(data)
  }, [])

  return (
    <div className="flex flex-col text-sm">
      <div className="mb-8">
        <span className="text-sm font-medium">Total status of requests</span>
      </div>
      <div className="flex flex-col justify-normal">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Request Date</th>
              <th>Requester</th>
              <th>Approver</th>
              <th>SLA</th>
              <th>ID Requester</th>
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
                    <td className="w-1/7 py-3">{request.requestData}</td>
                    <td className="w-1/7 py-3">{request.requester}</td>
                    <td className="w-1/7 py-3">{request.approver}</td>
                    <td className="w-1/7 py-3">{request.SLA}</td>
                    <td className="w-1/7 py-3">{request.requestId}</td>
                    <td className="w-1/7 py-3">
                      <Link
                        href={request.link}
                        className="rounded border-[1px] py-1 px-2 border-[#F3AF25] text-[#F3AF25]"
                      >
                        Assess
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
export default RequestsList
