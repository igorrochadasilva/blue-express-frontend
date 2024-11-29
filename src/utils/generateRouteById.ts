import { RequestsTitleEnum } from '../types/requests/enums';

interface GenerateRouteById {
  title: string;
  id: number;
}

export const generateRouteById = ({ title, id }: GenerateRouteById) => {
  const routeMapper: Record<RequestsTitleEnum, string> = {
    [RequestsTitleEnum.MAINTENANCE_CONTRACT]: `/contract-requests/generate-request/maintenance-contract/${id}`,
    [RequestsTitleEnum.SOFTWARE_SERVICE_CONTRACT]: `/contract-requests/generate-request/software-service-contract/${id}`,
    [RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT]: `/contract-requests/generate-request/distributor-representatives-contract/${id}`,
  };

  return routeMapper[title as RequestsTitleEnum];
};
