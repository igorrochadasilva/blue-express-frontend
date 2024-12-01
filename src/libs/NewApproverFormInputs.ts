import {
  approverLevelOptions,
  companyOptions,
  requestTypesOptions,
} from './options';
import { NewApproverFormInput } from '@/types/approvers/newApprover';

export const NewApproverFormInputs: NewApproverFormInput[][] = [
  [
    {
      id: 1,
      type: 'select',
      labelText: 'Approver',
      inputName: 'userId',
      inputType: '',
      required: true,
      readonly: false,
      validation: {
        required: 'Approver is required',
      },
    },
    {
      id: 2,
      type: 'select',
      labelText: 'Request Type',
      inputName: 'title',
      inputType: '',
      required: true,
      readonly: false,
      options: requestTypesOptions,
      validation: {
        required: 'Request type is required',
      },
    },
    {
      id: 3,
      type: 'input',
      labelText: 'Approval Level',
      inputName: 'level',
      inputType: 'number',
      required: true,
      readonly: false,
      validation: {
        required: 'Approval level is required',
        min: {
          value: 1,
          message: 'Approval level must be at least 1',
        },
      },
    },
  ],
  [
    {
      id: 4,
      type: 'input',
      labelText: 'Competence',
      inputName: 'competence',
      inputType: 'number',
      required: true,
      readonly: false,
      validation: {
        required: 'Competence is required',
        min: {
          value: 0,
          message: 'Competence must be a positive number',
        },
      },
    },
    {
      id: 5,
      type: 'select',
      labelText: 'Company Type',
      inputName: 'company',
      inputType: '',
      required: true,
      readonly: false,
      options: companyOptions,
      validation: {
        required: 'Company type is required',
      },
    },
    {
      id: 6,
      type: 'select',
      labelText: 'Office',
      inputName: 'office',
      inputType: '',
      required: true,
      readonly: false,
      options: approverLevelOptions,
      validation: {
        required: 'Office is required',
      },
    },
  ],
];
