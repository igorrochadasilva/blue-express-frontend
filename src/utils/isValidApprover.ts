import { RequestStatusEnum } from '@/types/requests/enums';

interface isValidApproverProp {
  userRole: number;
  userName: string;
  contractStatus: string;
  contractApproverNames: string;
}

export const isValidApprover = ({
  userName,
  userRole,
  contractStatus,
  contractApproverNames,
}: isValidApproverProp): boolean => {
  return (
    contractStatus !== RequestStatusEnum.WAITING_FOR_APPROVAL &&
    (userRole === 3 || contractApproverNames.includes(userName))
  );
};
