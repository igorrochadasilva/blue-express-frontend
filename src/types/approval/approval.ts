import { ErrorResponse } from '../error';
import { RequestStatusEnum, RequestsTitleEnum } from '../requests/enums';

export interface PostApprovalDTO {
  title: string;
  level: number;
  status: RequestStatusEnum;
  justify: string;
  author: string;
  typeRequest: RequestsTitleEnum;
  maintenanceContractID?: number;
  softwareServiceContractID?: number;
  distributorRepresentativesContractID?: number;
  userID: number;
}

export interface PostApprovalResponse extends ErrorResponse {
  data?: {
    message: string;
    approval: unknown;
  };
}
