import { PostApproverDTO } from '@/types/approvers/approvers';
import { RequestsKeyEnum, RequestsTitleEnum } from '@/types/requests/enums';

export const buildPostData = (data: PostApproverDTO): PostApproverDTO => {
  const mapTitleToKey = (title: RequestsTitleEnum): RequestsKeyEnum => {
    const titleToKeyMap: Record<RequestsTitleEnum, RequestsKeyEnum> = {
      [RequestsTitleEnum.MAINTENANCE_CONTRACT]:
        RequestsKeyEnum.MAINTENANCE_CONTRACT_KEY,
      [RequestsTitleEnum.SOFTWARE_SERVICE_CONTRACT]:
        RequestsKeyEnum.SOFTWARE_SERVICE_CONTRACT_KEY,
      [RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT]:
        RequestsKeyEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT_KEY,
    };

    return titleToKeyMap[title];
  };

  return {
    ...data,
    key: mapTitleToKey(data?.title),
    userId: Number(data.userId),
    level: Number(data.level),
    competence: Number(data.competence),
  };
};
