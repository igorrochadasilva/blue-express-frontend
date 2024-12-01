import { RegisterOptions } from 'react-hook-form';
import { PostApproverDTO } from './approvers';

export interface NewApproverFormOption {
  label: string;
  value: string | number;
}

export interface SelectOptions {
  value: string;
  label: string;
}

export interface UserNames extends SelectOptions {}

export interface NewApproverFormInput {
  id: number;
  type: string;
  labelText: string;
  inputName: keyof PostApproverDTO;
  inputType: string;
  required: boolean;
  readonly: boolean;
  options?: SelectOptions[] | UserNames[];
  validation?: RegisterOptions;
}
