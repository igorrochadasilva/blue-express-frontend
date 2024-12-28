import { RequestStatusEnum } from '@/types/requests/enums';
import { UserRole } from '@/types/requests/requests';

interface IsApprobationProps {
  contractStatus: RequestStatusEnum;
  userRole: UserRole;
}

export const isApprobation = ({
  contractStatus,
  userRole,
}: IsApprobationProps) => {
  return (
    contractStatus !== RequestStatusEnum.SKETCH &&
    contractStatus !== RequestStatusEnum.WAITING_FOR_APPROVAL &&
    userRole === UserRole.APPROVER
  );
};
