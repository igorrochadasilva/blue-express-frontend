'use server';

import { listMaintenanceContract } from '../actions/requests/maintenance-contract/listMaintenanceContract';
import { listServiceContract } from '../actions/requests/service-contract/listServiceContract';
import { IRequestBody } from '../types/global/types';
import { MaintenanceContract } from '../types/requests/maintenance.contract';
import { SoftwareServiceContract } from '../types/requests/softwaerServiceContract';

interface Requests {
  maintenanceContract: MaintenanceContract[];
  serviceContract: SoftwareServiceContract[];
  distributorRepresentativesContract: IRequestBody[];
}

export type RequestsData = (
  | IRequestBody
  | MaintenanceContract
  | SoftwareServiceContract
)[];

export async function useGetRequests() {
  const allRequests: Requests = {
    maintenanceContract: [],
    serviceContract: [],
    distributorRepresentativesContract: [],
  };

  const maintenanceContractRequests = await listMaintenanceContract();
  const serviceContract = await listServiceContract();

  allRequests.maintenanceContract = maintenanceContractRequests?.data;
  allRequests.serviceContract = serviceContract?.data;

  const combinedRequests = Object.values(allRequests).flat();
  console.log('🚀 ~ useGetRequests ~ combinedRequests:', combinedRequests);

  return combinedRequests;
}
