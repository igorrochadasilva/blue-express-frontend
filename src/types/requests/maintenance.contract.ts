import { ErrorResponse } from '../error';

export interface MaintenanceContract {
  id: number;
  title: string;
  requesterName: string;
  clientName: string;
  clmHeaderNumber: string;
  clmLineNumber: string;
  typeContract: string;
  company: string;
  status: string;
  renewStartDate: string;
  renewEndDate: string;
  contractRenewQtd: number;
  frequency: string;
  scope: string;
  contractTotalValue: string;
  dollarExchangeRate: string;
  totalValueUSD: string;
  gm: string;
  renewIndexPercentage: string;
  index: number;
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
  author: string;
  approvalLevel: string;
  phone: string;
  contact: string;
  antiCorruption: string;
  uf: string;
  sap: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMaintenanceContractResponse extends ErrorResponse {
  data: MaintenanceContract[];
}

export interface PostMaintenanceContractDTO {
  requesterId: number;
  requesterName: string;
  clientName: string;
  clmHeaderNumber: string;
  clmLineNumber: string;
  typeContract: 'renovation' | 'new' | string;
  company: string;
  status: 'waiting for approval' | 'approved' | 'disapproved' | string; // Enum can be refined further
  renewStartDate: string; // ISO date string (e.g., "2023-01-01")
  renewEndDate: string; // ISO date string (e.g., "2024-01-01")
  contractRenewQtd: number;
  frequency: 'monthly' | 'yearly' | string; // Enum can be refined further
  scope: string;
  contractTotalValue: number;
  dollarExchangeRate: number;
  totalValueUSD: number;
  gm: number;
  renewIndexPercentage: number;
  index: number;
  paymentCondition: string;
  inclusionClauses: string;
  inclusionDescription: string;
  legalIndemnificationObligations: string;
  legalWarrantyObligations: string;
  legalDamageCap: string;
  legalDamageCave: string;
  legalLiquidatedDamages: string;
  justify: string;
  approvalLevel: string;
  phone: string; // Consider validating this format with a regex or a library
  contact: string; // Email format
  antiCorruption: string;
  uf: string; // State abbreviation
  sap: string;
}

export interface PostMaintenanceContractResponse extends ErrorResponse {
  data: MaintenanceContract[];
}
