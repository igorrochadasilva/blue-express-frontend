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

export interface ListSoftwareServiceContractResponse extends ErrorResponse {
  data: SoftwareServiceContract[];
}
