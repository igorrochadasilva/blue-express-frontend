import { PostDistributorRepresentativesContractDTO } from './distributorRepresentativesContract';
import { PostMaintenanceContractDTO } from './maintenance.contract';
import { PostSoftwareServiceContractDTO } from './softwaerServiceContract';

export interface FormInputBase {
  id: number;
  type: 'input' | 'select';
  labelText: string;
  inputName: string;
  inputType?: string;
  required: boolean;
  readonly: boolean;
}

export interface InputFormInput extends FormInputBase {
  type: 'input';
  step?: string;
}

export interface SelectFormInput extends FormInputBase {
  type: 'select';
  options?: Array<{ value: string | number; label: string }>;
}

export type FormInput = InputFormInput | SelectFormInput;

export type FormDataInputs = FormInput[][];

export type RequestsDTO = PostMaintenanceContractDTO;

export enum UserRole {
  USER = 1,
  APPROVER = 2,
  ADMIN = 3,
}

export type PostContractsDTO =
  | PostMaintenanceContractDTO
  | PostSoftwareServiceContractDTO
  | PostDistributorRepresentativesContractDTO;
