import { useEffect, useState } from 'react';
import {
  calculateSLA,
  formatApproverName,
  formatDate,
  generateRouteForId,
} from '../../../../libs/utils';
import { IRequestBody } from '../../../../types/global/types';
import ListRequests from './List';

interface IRequestsList {
  requests: IRequestBody[];
}

interface IRequest {
  type: string;
  status: string;
  statusColor: string;
  requestDate: string;
  requester: string;
  approver: string;
  SLA: string;
  requestId: string;
  id: string;
  order: string;
  link: string;
}

const RequestsList = ({ requests }: IRequestsList) => {
  const [listRequests, setListRequests] = useState<any>();

  useEffect(() => {
    const filteredRequests = requests.filter(
      (request) => request.status === 'waiting for approval'
    );

    const data = filteredRequests.map((request, index) => {
      const statusColor =
        {
          approved: '#00D134',
          disapproved: '#EB1400',
          'waiting for approval': '#F3AF25',
          'waiting for information': '#F3AF25',
          sketch: '#98A4AE',
        }[request.status] || '#ccc';

      const formattedApprovers = request.currentApproverName
        ? formatApproverName(request.currentApproverName)
        : '';

      const requestLink = generateRouteForId(request.requestId, request.id);

      return {
        type: request.title,
        status: request.status,
        statusColor: statusColor,
        requestDate: formatDate(request.createdAt),
        requester: request.requesterName,
        approver: formattedApprovers,
        SLA: calculateSLA(request.createdAt),
        requestId: request.requestId,
        order: index,
        link: requestLink,
      };
    });

    setListRequests(data);
  }, [requests]);

  return (
    <ListRequests.Root>
      <ListRequests.Title text="Total status of requests" />
      <ListRequests.Table>
        <ListRequests.Thead />
        <tbody>
          {listRequests &&
            listRequests.map((request: IRequest) => {
              return (
                <ListRequests.Content
                  key={request.order}
                  type={request.type}
                  status={request.status}
                  statusColor={request.statusColor}
                  requestDate={request.requestDate}
                  order={request.order}
                  link={request.link}
                  requestId={request.requestId}
                  sla={request.SLA}
                  requester={request.requester}
                  approver={request.approver}
                />
              );
            })}
        </tbody>
      </ListRequests.Table>
    </ListRequests.Root>
  );
};
export default RequestsList;
