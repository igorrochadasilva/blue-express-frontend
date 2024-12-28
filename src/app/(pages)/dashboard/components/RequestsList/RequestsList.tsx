import { useEffect, useState } from 'react';

import ListRequests from './List';
import { RequestsData } from '@/hooks/useGetRequests';
import { RequestItem } from '@/types/dashboard/dashboard';
import { Request } from '@/types/global/types';

import { generateRouteById } from '@/utils/generateRouteById';
import { formatDate } from '@/utils/format/formatDate';
import { formatApproverName } from '@/utils/format/formatApproverName';

const STATUS_COLORS: Record<string, string> = {
  approved: '#00D134',
  disapproved: '#EB1400',
  'waiting for approval': '#F3AF25',
  'waiting for information': '#F3AF25',
  sketch: '#98A4AE',
};

interface RequestsListProps {
  requests: RequestsData;
}

const RequestsList = ({ requests }: RequestsListProps) => {
  const [listRequests, setListRequests] = useState<RequestItem[]>();

  const calculateSLA = (date: string) => {
    const requestDate = new Date(date);
    const currentDate = new Date();
    const timeDiffMs = currentDate.getTime() - requestDate.getTime();
    const daysSinceCreation = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

    return daysSinceCreation;
  };

  useEffect(() => {
    const mapRequestToListItem = (
      request: Request,
      index: number
    ): RequestItem => ({
      id: request.id,
      type: request.title,
      status: request.status,
      statusColor: STATUS_COLORS[request.status] || '#ccc',
      requestDate: formatDate(request.createdAt),
      requester: request.requesterName,
      approver: request.currentApproverName
        ? formatApproverName(request.currentApproverName)
        : '',
      SLA: calculateSLA(request.createdAt),
      order: index,
      link: generateRouteById({ id: request.id, title: request.title }),
    });

    const data = requests
      .filter((request) => request.status === 'waiting for approval')
      .map(mapRequestToListItem);

    setListRequests(data);
  }, [requests]);

  return (
    <ListRequests.Root>
      <ListRequests.Title text="Total status of requests" />
      <ListRequests.Table>
        <ListRequests.Thead />
        <tbody>
          {listRequests &&
            listRequests.map((request: RequestItem) => {
              return (
                <ListRequests.Content
                  key={request.order}
                  type={request.type}
                  status={request.status}
                  statusColor={request.statusColor}
                  requestDate={request.requestDate}
                  order={request.order}
                  link={request.link}
                  requestId={request.id}
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
