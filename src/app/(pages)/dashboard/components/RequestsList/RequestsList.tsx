import { useEffect, useState } from 'react';

import { RequestsData } from '@/hooks/useGetRequests';
import { RequestItem } from '@/types/dashboard/dashboard';
import { Request } from '@/types/global/types';

import { generateRouteById } from '@/utils/generateRouteById';
import { formatDate } from '@/utils/format/formatDate';
import { formatApproverName } from '@/utils/format/formatApproverName';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

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
    <div className="flex flex-col text-sm">
      <TableCaption className="w-full block text-left my-3">
        Total status of requests
      </TableCaption>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contract Date</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Approver</TableHead>
            <TableHead>SLA</TableHead>
            <TableHead>Contract ID</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listRequests &&
            listRequests.map((request: RequestItem) => {
              return (
                <TableRow key={request.order}>
                  <TableCell>{request.type}</TableCell>
                  <TableCell style={{ color: request.statusColor }}>
                    {request.status}
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.requester}</TableCell>
                  <TableCell>{request.approver}</TableCell>
                  <TableCell>{request.SLA}</TableCell>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>
                    <Link
                      href={request.link}
                      className="rounded border-[1px] py-1 px-2 border-[#F3AF25] text-[#F3AF25]"
                    >
                      Evaluate
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
export default RequestsList;
