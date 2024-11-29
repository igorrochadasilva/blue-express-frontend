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

export interface ListDistributorRepresentativesContractResponse
  extends ErrorResponse {
  data: DistributorRepresentativesContract[];
}
