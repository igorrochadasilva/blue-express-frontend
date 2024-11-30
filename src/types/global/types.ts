import { ReactElement } from 'react';
import { MaintenanceContract } from '../requests/maintenance.contract';
import { SoftwareServiceContract } from '../requests/softwaerServiceContract';
import { DistributorRepresentativesContract } from '../requests/distributorRepresentativesContract';

export type Request =
  | MaintenanceContract
  | SoftwareServiceContract
  | DistributorRepresentativesContract;

export type TApprover = {
  approverEmail: string;
  approverName: string;
  company: string;
  competence: number;
  id: number;
  key: string;
  level: number;
  office: string;
  title: string;
};

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
      name?: any;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

//Dashboard

export type requestsList = {
  type: string;
  status: string;
  requester: string;
  id_request: string;
}[];

export type barData = {
  text: string;
  color: string;
  barSize: number;
  qtd: number;
};

export type TFiles = { name: string; link: string }[];

export interface INewApproverData {
  user: number;
  title: string;
  level: number;
  competence: number;
  company: string;
  key?: string;
}

export interface IApproverData {
  id: number;
  title: string;
  level: number;
  key: string;
  company: string;
  office: string;
  competence: number;
  approverEmail: string;
  approverName: string;
  user: any;
}

export interface IMenuItems {
  title: string;
  path?: string;
  icon?: ReactElement<any, any>;
  subItems?: ISubMenuItem[];
}

export interface ISubMenuItem {
  title: string;
  path: string;
}
