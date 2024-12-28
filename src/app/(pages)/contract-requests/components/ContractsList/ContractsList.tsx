import { formatApproverName } from '../../../../../libs/utils';
import { v4 as uuid4 } from 'uuid';
import ListRequests from './List';
import { RequestsData } from '../../../../../hooks/useGetRequests';
import { generateRouteById } from '../../../../../utils/generateRouteById';
import { Request } from '../../../../../types/global/types';

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
    <ListRequests.Root>
      <ListRequests.Thead />
      <tbody>
        {requests.map((request: Request, index: number) => {
          const statusColor = STATUS_COLORS[request.status] || '#ccc';
          const formattedApprovers = formatApproverName(
            request.currentApproverName
          );
          const requestLink = generateRouteById({
            title: request.title,
            id: request.id,
          });

          return (
            <ListRequests.Content
              key={uuid4()}
              order={index}
              type={request.title}
              statusColor={statusColor}
              status={request.status}
              validity={request.renewEndDate}
              requestId={String(request.id)}
              level={request.currentLevel}
              approver={formattedApprovers}
              link={requestLink}
            />
          );
        })}
      </tbody>
    </ListRequests.Root>
  );
};

export default ContractsList;
