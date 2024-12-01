import { MaintenanceContract } from '../requests/maintenance.contract';
import { SoftwareServiceContract } from '../requests/softwaerServiceContract';
import { DistributorRepresentativesContract } from '../requests/distributorRepresentativesContract';

export type Request =
  | MaintenanceContract
  | SoftwareServiceContract
  | DistributorRepresentativesContract;

export interface IApprover {
  type: string;
  competence: number;
  approverName: string;
  level: string;
  companyType: string;
  id: number;
}

export type TUser =
  | {
      accessToken?: string;
      department?: string;
      id?: number;
      position?: string;
      role?: number;
      name?: string;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

//Dashboard

export type TFiles = { name: string; link: string }[];

export interface INewApproverData {
  user: number;
  title: string;
  level: number;
  competence: number;
  company: string;
  key?: string;
}
