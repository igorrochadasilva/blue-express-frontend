import { ErrorResponse } from '../error';

export interface DistributorRepresentativesContract {
  id: number;
  title: string;
  typeRequestOrder: string;
  nameRepresentativeDistributor: string;
  company: string;
  contact: string;
  vendor: string;
  phone: string;
  clmHeaderNumber: string;
  clmLineNumber: string;
  renewStartDate: string; // ISO date string
  renewEndDate: string; // ISO date string
  commissionPercentage: string; // Represents a percentage as a string
  manager: string;
  uf: string;
  justify: string;
  activity: string;
  antiCorruption: string;
  typeContract: string;
  requesterName: string;
  currentLevel: number;
  status: string;
  approvalDate: string; // ISO date string
  currentApproverName: string;
  approvalLevel: string;
  sap: string;
  author: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface GetDistributorRepresentativesContractResponse
  extends ErrorResponse {
  data: DistributorRepresentativesContract[];
}

export interface PostDistributorRepresentativesContractDTO {
  requesterName?: string;
  requesterId: number;
  clmHeaderNumber: string;
  clmLineNumber?: string;
  typeContract: string;
  company: string;
  status: string;
  renewStartDate: string;
  renewEndDate: string;
  nameRepresentativeDistributor: string;
  vendor?: string;
  commissionPercentage?: number;
  manager?: string;
  activity?: string;
  justify: string;
  requestId: string;
  approvalDate?: string;
  approvalLevel: string;
  phone?: string;
  contact?: string;
  antiCorruption?: string;
  uf?: string;
  sap?: string;
  filesName?: string;
  typeRequestOrder: string;
  files?: string;
}

export interface PostDistributorRepresentativesContractResponse
  extends ErrorResponse {
  data?: { message: string };
}
