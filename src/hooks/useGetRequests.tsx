'use server';

import { listDistributorRepresentativesContract } from '../actions/requests/distributor-representatives-contract/listDistributorRepresentativesContract';
import { listMaintenanceContract } from '../actions/requests/maintenance-contract/listMaintenanceContract';
import { listServiceContract } from '../actions/requests/software-service-contract/listSoftwareServiceContract';
import { IRequestBody } from '../types/global/types';
import { DistributorRepresentativesContract } from '../types/requests/distributorRepresentativesContract';
import { MaintenanceContract } from '../types/requests/maintenance.contract';
import { SoftwareServiceContract } from '../types/requests/softwaerServiceContract';

interface Requests {
  maintenanceContract: MaintenanceContract[];
  softwareServiceContract: SoftwareServiceContract[];
  distributorRepresentativesContract: DistributorRepresentativesContract[];
}

export type RequestsData = (
  | MaintenanceContract
  | SoftwareServiceContract
  | DistributorRepresentativesContract
)[];

export async function useGetRequests() {
  const allRequests: Requests = {
    maintenanceContract: [],
    softwareServiceContract: [],
    distributorRepresentativesContract: [],
  };

  const maintenanceContractRequests = await listMaintenanceContract();
  const softwareServiceContract = await listServiceContract();
  const distributorRepresentativesContract =
    await listDistributorRepresentativesContract();

  allRequests.maintenanceContract = maintenanceContractRequests?.data;
  allRequests.softwareServiceContract = softwareServiceContract?.data;
  allRequests.distributorRepresentativesContract =
    distributorRepresentativesContract?.data;

  const combinedRequests = Object.values(allRequests).flat();

  return combinedRequests;
}
