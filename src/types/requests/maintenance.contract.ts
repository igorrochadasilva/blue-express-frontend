import { ErrorResponse } from '../error';

export interface MaintenanceContract {
  id: string;
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
  contractRenewQtd: string;
  frequency: string;
  scope: string;
  contractTotalValue: string;
  dollarExchangeRate: string;
  totalValueUSD: string;
  gm: string;
  renewIndexPercentage: string;
  index: string;
  paymentCondition: string;
  inclusionClauses: string;
  inclusionDescription: string;
  legalIndemnificationObligations: string;
  legalWarrantyObligations: string;
  legalDamageCap: string;
  legalDamageCave: string;
  legalLiquidatedDamages: string;
  justify: string;
  currentLevel: string;
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

export interface GetMaintenanceContractByIdResponse extends ErrorResponse {
  data: {
    request: MaintenanceContract;
  };
}

export interface PostMaintenanceContractDTO {
  requesterId: string;
  requesterName: string;
  clientName: string;
  clmHeaderNumber: string;
  clmLineNumber: string;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  typeContract: 'renovation' | 'new' | string;
  company: string;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  status: 'waiting for approval' | 'approved' | 'disapproved' | string; // Enum can be refined further
  renewStartDate: string; // ISO date string (e.g., "2023-01-01")
  renewEndDate: string; // ISO date string (e.g., "2024-01-01")
  contractRenewQtd: string;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  frequency: 'monthly' | 'yearly' | string; // Enum can be refined further
  scope: string;
  contractTotalValue: string;
  dollarExchangeRate: string;
  totalValueUSD: string;
  gm: string;
  renewIndexPercentage: string;
  index: string;
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
  files?: string | number | readonly string[] | undefined; //File[];
}

export interface PostMaintenanceContractResponse extends ErrorResponse {
  data?: { message: string };
}

export interface UpdateMaintenanceContractDTO
  extends Omit<PostMaintenanceContractDTO, 'requesterId'> {
  id: string;
  requesterId?: string;
}

export interface UpdateMaintenanceContractResponse extends ErrorResponse {
  data: {
    message: string;
  };
}
