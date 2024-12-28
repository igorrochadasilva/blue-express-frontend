import { UserSession } from '@/types/auth/sign';
import { RequestStatusEnum } from '@/types/requests/enums';
import { UserRole } from '@/types/requests/requests';

interface isValidApproverProp {
  user: UserSession;
  contractStatus: string;
  contractApproverNames: string;
  contractAuthor: string;
}

export const isValidApprover = ({
  user,
  contractStatus,
  contractApproverNames,
  contractAuthor,
}: isValidApproverProp): boolean => {
  return (
    contractStatus === RequestStatusEnum.WAITING_FOR_APPROVAL &&
    user.role !== UserRole.USER &&
    (contractApproverNames.includes(user.name) ||
      user.email === contractAuthor ||
      user.role === UserRole.ADMIN)
  );
};
