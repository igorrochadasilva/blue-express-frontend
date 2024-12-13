import { PostMaintenanceContractDTO } from './maintenance.contract';

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
  type: 'input'; // Narrow type to "input"
  step?: string; // Optional for number inputs
}

export interface SelectFormInput extends FormInputBase {
  type: 'select'; // Narrow type to "select"
  options?: Array<{ value: string | number; label: string }>; // Options for select inputs
}

export type FormInput = InputFormInput | SelectFormInput;

export type FormDataInputs = FormInput[][]; // 2D array representing grouped inputs

export type RequestsDTO = PostMaintenanceContractDTO;

export enum UserRole {
  USER = 0,
  APPROVER = 1,
  ADMIN = 2,
}
