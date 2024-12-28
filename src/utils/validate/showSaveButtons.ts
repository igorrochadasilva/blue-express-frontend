import { UserSession } from '@/types/auth/sign';
import { RequestStatusEnum } from '@/types/requests/enums';
import { UserRole } from '@/types/requests/requests';

interface showSaveButtonsProp {
  user: UserSession;
  contractStatus: string;
  contractAuthor: string;
}

export const showSaveButtons = ({
  user,
  contractStatus,
  contractAuthor,
}: showSaveButtonsProp): boolean => {
  return (
    contractStatus !== RequestStatusEnum.WAITING_FOR_APPROVAL &&
    contractStatus !== RequestStatusEnum.APPROVED &&
    (contractAuthor === user.email || user.role === UserRole.ADMIN)
  );
};
