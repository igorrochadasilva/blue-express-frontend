export enum RequestsTitleEnum {
  MAINTENANCE_CONTRACT = 'Maintenance Contract',
  SOFTWARE_SERVICE_CONTRACT = 'Software Service Contract',
  DISTRIBUTOR_REPRESENTATIVES_CONTRACT = 'Distributor Representatives Contract',
}

export enum RequestsRoutesEnum {
  MAINTENANCE_CONTRACT = 'maintenance-contract',
  SOFTWARE_SERVICE_CONTRACT = 'software-service-contract',
  DISTRIBUTOR_REPRESENTATIVES_CONTRACT = 'distributor-representatives-contract',
}

export enum RequestsKeyEnum {
  MAINTENANCE_CONTRACT_KEY = 'MC',
  DISTRIBUTOR_REPRESENTATIVES_CONTRACT_KEY = 'DRC',
  SOFTWARE_SERVICE_CONTRACT_KEY = 'SSC',
}

export enum RequestCompanyEnum {
  PD = 'PD',
  PS = 'PS',
  CH = 'CH',
  CPDI = 'CPDI',
  ALL = 'ALL',
}

export enum RequestOfficeEnum {
  ANALYST = 'analyst',
  SUPERVISOR = 'supervisor',
  MANAGER = 'manager',
  DIRECTOR = 'director',
  CEO = 'ceo',
}

export const OfficeLevelMap: Record<RequestOfficeEnum, number> = {
  [RequestOfficeEnum.ANALYST]: 1,
  [RequestOfficeEnum.SUPERVISOR]: 2,
  [RequestOfficeEnum.MANAGER]: 3,
  [RequestOfficeEnum.DIRECTOR]: 4,
  [RequestOfficeEnum.CEO]: 5,
};

export enum RequestStatusEnum {
  WAITING_FOR_APPROVAL = 'waiting for approval',
  WAITING_FOR_INFORMATION = 'waiting for information',
  APPROVED = 'approved',
  DISAPPROVED = 'disapproved',
  SKETCH = 'sketch',
}

export enum ContractTypeEnum {
  NEW = 'new',
  RENOVATION = 'renovation',
  READJUSTMENT = 'readjustment',
  OTHERS = 'others',
}

export enum FrequencyEnum {
  MONTHLY = 'monthly',
  BIMONTHLY = 'bimonthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semi-annual',
  YEARLY = 'Yearly',
  MIXED_DIVERSE = 'mixed/diverse',
}

export enum UFEnum {
  AC = 'AC',
  AL = 'AL',
  AM = 'AM',
  AP = 'AP',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MG = 'MG',
  MS = 'MS',
  MT = 'MT',
  PA = 'PA',
  PB = 'PB',
  PE = 'PE',
  PI = 'PI',
  PR = 'PR',
  RJ = 'RJ',
  RN = 'RN',
  RO = 'RO',
  RR = 'RR',
  RS = 'RS',
  SC = 'SC',
  SE = 'SE',
  SP = 'SP',
  TO = 'TO',
}
