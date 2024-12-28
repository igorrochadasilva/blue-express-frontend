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
  CONTROLLER = 'controller',
  SUPERVISOR = 'supervisor',
  MANAGER = 'manager',
  LOCAL_BUSINESS_MANAGER = 'local business manager',
  DIVISION = 'division',
  PRESIDENT = 'president',
  GROUP = 'group',
  SECTOR = 'sector',
  CEO = 'ceo',
}

export enum RequestStatusEnum {
  WAITING_FOR_APPROVAL = 'waiting for approval',
  WAITING_FOR_INFORMATION = 'waiting for information',
  APPROVED = 'approved',
  DISAPPROVED = 'disapproved',
  SKETCH = 'sketch',
}
