'use server';

import { getDistributorRepresentativesContract } from '../actions/requests/distributor-representatives-contract/getDistributorRepresentativesContract';
import { getMaintenanceContract } from '../actions/requests/maintenance-contract/getMaintenanceContract';
import { getServiceContract } from '../actions/requests/software-service-contract/getSoftwareServiceContract';
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

export async function getRequests() {
  const allRequests: Requests = {
    maintenanceContract: [],
    softwareServiceContract: [],
    distributorRepresentativesContract: [],
  };

  const maintenanceContractRequests = await getMaintenanceContract();
  const softwareServiceContract = await getServiceContract();
  const distributorRepresentativesContract =
    await getDistributorRepresentativesContract();

  allRequests.maintenanceContract = maintenanceContractRequests?.data;
  allRequests.softwareServiceContract = softwareServiceContract?.data;
  allRequests.distributorRepresentativesContract =
    distributorRepresentativesContract?.data;

  const combinedRequests = Object.values(allRequests).flat();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return combinedRequests;
}
