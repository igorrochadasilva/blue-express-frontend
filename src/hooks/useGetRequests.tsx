'use server';

import { listMaintenanceContract } from '../actions/requests/maintenance-contract/listMaintenanceContract';
import { IRequestBody } from '../types/global/types';
import { MaintenanceContract } from '../types/requests/maintenance.contract';

interface Requests {
  maintenanceContract: MaintenanceContract[];
  serviceContract: IRequestBody[];
  distributorRepresentativesContract: IRequestBody[];
}

export type RequestsData = (IRequestBody | MaintenanceContract)[];

export async function useGetRequests() {
  const allRequests: Requests = {
    maintenanceContract: [],
    serviceContract: [],
    distributorRepresentativesContract: [],
  };

  const maintenanceContractRequests = await listMaintenanceContract();

  allRequests.maintenanceContract = maintenanceContractRequests?.data;

  const combinedRequests = Object.values(allRequests).flat();
  console.log('🚀 ~ useGetRequests ~ combinedRequests:', combinedRequests);

  return combinedRequests;
}
