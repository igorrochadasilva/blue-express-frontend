import { ErrorResponse } from '../error';
import {
  RequestsRoutesEnum,
  RequestStatusEnum,
  RequestsTitleEnum,
} from '../requests/enums';

export interface PostApprovalDTO {
  data: {
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
  };
  route: RequestsRoutesEnum;
}

export interface PostApprovalResponse extends ErrorResponse {
  data?: {
    message: string;
    approval: unknown;
  };
}
