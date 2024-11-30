import { ErrorResponse } from '../error';

export interface ApproverRow {
  type: string;
  competence: string;
  approverName: string;
  level: number;
  companyType: string;
  id: number;
}

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

export interface GetApproversResponse extends ErrorResponse {
  data: Approver[];
}
