import { MaintenanceContract } from '../requests/maintenance.contract';
import { SoftwareServiceContract } from '../requests/softwaerServiceContract';
import { DistributorRepresentativesContract } from '../requests/distributorRepresentativesContract';

export type Request =
  | MaintenanceContract
  | SoftwareServiceContract
  | DistributorRepresentativesContract;

export type TFiles = { name: string; link: string }[];
