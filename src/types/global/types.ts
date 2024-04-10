export type TRequestBody = {
  id: number
  title: string
  clientName: string
  clmHeaderNumber: string
  clmLineNumber: string
  typeContract: string
  company: string
  status: string
  renewStartDate: string
  renewEndDate: string
  contractRenewQtd: number
  frequency: string
  scope: string
  contractTotalValue: number
  dollarExchangeRate: string
  totalValueUSD: string
  gm: string
  renewIndexPercentage: string
  index: number
  paymentCondition: string
  inclusionClauses: string
  inclusionDescription: string
  legalIndemnificationObligations: string
  legalWarrantyObligations: string
  legalDamageCap: string
  legalDamageCave: string
  legalLiquidatedDamages: string
  justify: string
  requestId: string
  currentLevel: number
  author: string
  approvalLevel: string
  phone: string
  contact: string
  antiCorruption: string
  uf: string
  sap: string
  createdAt: string
  updatedAt: string
  requesterName: string
  requesterEmail: string
  currentApproverName: string
}

export type TApprover = {
  approverEmail: string
  approverName: string
  company: string
  competence: number
  id: number
  key: string
  level: number
  office: string
  title: string
}

export interface IApprover {
  type: string
  competence: number
  approverName: string
  level: string
  companyType: string
  id: number
}

export type TUser =
  | {
      accessToken?: string
      department?: string
      id?: number
      position?: string
      role?: number
      name?: string | null | undefined
      email?: string | null | undefined
      image?: string | null | undefined
    }
  | undefined
