import { UserSession } from '@/types/auth/sign';
import { RequestStatusEnum } from '@/types/requests/enums';
import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';

export const buildPostMaintenanceContractData = (
  data: PostMaintenanceContractDTO,
  userSession: UserSession
): PostMaintenanceContractDTO => {
  return {
    ...data,
    requesterId: userSession.id,
    status: RequestStatusEnum.WAITING_FOR_APPROVAL,
  };
};
