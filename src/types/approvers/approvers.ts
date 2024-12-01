import { ErrorResponse } from '../error';
import {
  RequestCompanyEnum,
  RequestOfficeEnum,
  RequestsKeyEnum,
  RequestsTitleEnum,
} from '../requests/enums';

export interface Approver {
  id: number;
  title: string;
  level: number;
  key: string;
  company: string;
  office: string;
  competence: string;
  approverEmail: string;
  approverName: string;
}

export interface PostApproverDTO {
  title: RequestsTitleEnum;
  level: number;
  key: RequestsKeyEnum;
  company: RequestCompanyEnum;
  office: RequestOfficeEnum;
  competence: number;
  userId: number;
}

export interface PostApproverResponse extends ErrorResponse {
  data?: Approver;
}

export interface DeleteApproverDTO {
  id: number;
}

export interface DeleteApproverResponse extends ErrorResponse {
  data?: {
    message: string;
  };
}

export interface ApproverRow {
  type: string;
  competence: string;
  approverName: string;
  level: number;
  companyType: string;
  id: number;
}

export interface GetApproversResponse extends ErrorResponse {
  data: Approver[];
}
