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
