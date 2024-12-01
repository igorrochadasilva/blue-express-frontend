import { ErrorResponse } from '../error';
import { Approver } from './approvers';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  department: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  role: number;
  approvers?: Approver[];
}

export interface GetUsersResponse extends ErrorResponse {
  data?: User[];
}

export interface GetUserApproversResponse extends ErrorResponse {
  data?: User;
}
