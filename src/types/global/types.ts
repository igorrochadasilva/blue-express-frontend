export interface IRequestBody {
  id: number
  title: string
  clientName: string
  clmHeaderNumber: string
  clmLineNumber: string
  typeContract: string
  typeRequestOrder?: string
  company: string
  companyType?: string
  status: string
  renewStartDate: string
  renewEndDate: string
  contractRenewQtd: number
  commissionPercentage?: number
  frequency: string
  scope: string
  contractTotalValue: number
  dollarExchangeRate: number
  totalValueUSD: number
  gm: number
  renewIndexPercentage: number
  index: number
  paymentCondition: string
  inclusionClauses: string
  inclusionDescription: string
  legalIndemnificationObligations: string
  legalWarrantyObligations: string
  legalDamageCap: string
  legalDamageCave: string
  legalLiquidatedDamages: string
  startContractDate: string
  endContractDate: string
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
  files?: any
  filesName?: any
  requester?: number
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
      name?: any
      email?: string | null | undefined
      image?: string | null | undefined
    }
  | undefined

//Dashboard

export type requestsList = {
  type: string
  status: string
  requester: string
  id_request: string
}[]

export type barData = {
  text: string
  color: string
  barSize: number
  qtd: number
}

export type TFiles = { name: string; link: string }[]

export interface INewApproverData {
  user: number
  title: string
  level: number
  competence: number
  company: string
  key?: string
}

export interface IApproverData {
  id: number
  title: string
  level: number
  key: string
  company: string
  office: string
  competence: number
  approverEmail: string
  approverName: string
}
