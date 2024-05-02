import { useEffect, useState } from 'react'
import { IRequestBody } from '../../../types/global/types'
import { formatApproverName, generateRouteForId } from '../../../libs/utils'
import ListRequests from './List'
import { v4 as uuid4 } from 'uuid'

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
  }, [requests])

  return (
    <ListRequests.Root>
      <ListRequests.Thead />
      <tbody>
        {listRequests &&
          listRequests.map((request: IRequest) => {
            return (
              <ListRequests.Content
                key={uuid4()}
                order={request.order}
                type={request.type}
                statusColor={request.statusColor}
                status={request.status}
                validity={request.validity}
                requestId={request.requestId}
                level={request.level}
                approver={request.approver}
                link={request.link}
              />
            )
          })}
      </tbody>
    </ListRequests.Root>
  )
}
export default ContractsList
