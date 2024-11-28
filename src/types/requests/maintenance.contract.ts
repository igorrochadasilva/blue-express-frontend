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

export interface ListMaintenanceContractResponse extends ErrorResponse {
  data: MaintenanceContract[];
}
