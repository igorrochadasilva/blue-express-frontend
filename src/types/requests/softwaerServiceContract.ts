import { ErrorResponse } from '../error';

export interface SoftwareServiceContract {
  id: number;
  title: string;
  requesterName: string;
  clientName: string;
  clmHeaderNumber: string;
  clmLineNumber: string;
  typeContract: string;
  companyType: string;
  company: string;
  renewStartDate: string; // ISO date string
  renewEndDate: string; // ISO date string
  status: string;
  scope: string;
  contractTotalValue: string; // Represents a monetary value as a string
  dollarExchangeRate: string;
  totalValueUSD: string;
  gm: string;
  paymentCondition: string;
  inclusionClauses: string;
  inclusionDescription: string;
  legalIndemnificationObligations: string;
  legalWarrantyObligations: string;
  legalDamageCap: string;
  legalDamageCave: string;
  legalLiquidatedDamages: string;
  justify: string;
  currentLevel: number;
  currentApproverName: string;
  approvalLevel: string;
  phone: string;
  contact: string;
  antiCorruption: string;
  uf: string;
  sap: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetSoftwareServiceContractResponse extends ErrorResponse {
  data: SoftwareServiceContract[];
}

export interface GetSoftwareServiceContractByIdResponse extends ErrorResponse {
  data: {
    request: SoftwareServiceContract;
  };
}

export interface PostSoftwareServiceContractDTO {
  requesterName: string;
  requesterId: number;
  clientName: string;
  clmHeaderNumber: string;
  clmLineNumber: string;
  typeContract: string;
  companyType: string;
  company: string;
  status: string;
  renewStartDate: string;
  renewEndDate: string;
  scope: string;
  contractTotalValue: number;
  dollarExchangeRate: number;
  totalValueUSD: number;
  gm: number;
  paymentCondition: string;
  inclusionClauses: string;
  inclusionDescription: string;
  legalIndemnificationObligations: string;
  legalWarrantyObligations: string;
  legalDamageCap: string;
  legalDamageCave: string;
  legalLiquidatedDamages: string;
  justify: string;
  requestId: string;
  currentLevel: number;
  approvalLevel: string;
  phone: string;
  contact: string;
  antiCorruption: string;
  uf: string;
  sap: string;
  files?: File[];
}

export interface PostSoftwareServiceContractResponse extends ErrorResponse {
  data?: { message: string };
}

export interface UpdateSoftwareServiceContractDTO
  extends Omit<PostSoftwareServiceContractDTO, 'requesterId'> {
  id: number;
  requesterId?: number;
}

export interface UpdateSoftwareServiceContractResponse extends ErrorResponse {
  data: {
    message: string;
  };
}
