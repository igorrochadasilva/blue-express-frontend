import { v4 as uuid4 } from 'uuid';
import { RequestsData } from '@/hooks/useGetRequests';
import { generateRouteById } from '@/utils/generateRouteById';
import { Request } from '@/types/global/types';
import { formatApproverName } from '@/utils/format/formatApproverName';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

interface ContractsListProps {
  requests: RequestsData;
}

const STATUS_COLORS: Record<string, string> = {
  approved: '#00D134',
  disapproved: '#EB1400',
  'waiting for approval': '#F3AF25',
  'waiting for information': '#F3AF25',
  sketch: '#98A4AE',
};

const ContractsList = ({ requests }: ContractsListProps) => {
  return (
    <Table className="">
      <TableHeader className="bg-[#F8F8F8]">
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Validity</TableHead>
          <TableHead>Request ID</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Approver</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request: Request) => {
          const statusColor = STATUS_COLORS[request.status] || '#ccc';
          const formattedApprovers = formatApproverName(
            request.currentApproverName
          );
          const requestLink = generateRouteById({
            title: request.title,
            id: request.id,
          });
          return (
            <TableRow key={uuid4()}>
              <TableCell>{request.title}</TableCell>
              <TableCell style={{ color: statusColor }}>
                {request.status}
              </TableCell>
              <TableCell>{request.renewEndDate}</TableCell>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.currentLevel}</TableCell>
              <TableCell>{formattedApprovers}</TableCell>
              <TableCell>{request.id}</TableCell>
              <TableCell>
                <Link href={requestLink}>
                  <ArrowTopRightOnSquareIcon className="h-5" />
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ContractsList;
