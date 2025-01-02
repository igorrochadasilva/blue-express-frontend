import {
  approverLevelOptions,
  companyOptions,
  requestTypesOptions,
} from '../options';
import { NewApproverFormInput } from '@/types/approvers/newApprover';

export const NewApproverFormInputs: NewApproverFormInput[][] = [
  [
    {
      id: 1,
      type: 'select',
      labelText: 'Approver',
      inputName: 'userId',
      inputType: '',
      readonly: false,
    },
    {
      id: 2,
      type: 'select',
      labelText: 'Request Type',
      inputName: 'title',
      inputType: '',
      readonly: false,
      options: requestTypesOptions,
    },
    {
      id: 3,
      type: 'input',
      labelText: 'Approval Level',
      inputName: 'level',
      inputType: 'text',
      readonly: false,
    },
  ],
  [
    {
      id: 4,
      type: 'input',
      labelText: 'Competence',
      inputName: 'competence',
      inputType: 'text',
      readonly: false,
    },
    {
      id: 5,
      type: 'select',
      labelText: 'Company Type',
      inputName: 'company',
      inputType: '',
      readonly: false,
      options: companyOptions,
    },
    {
      id: 6,
      type: 'select',
      labelText: 'Office',
      inputName: 'office',
      inputType: '',
      readonly: false,
      options: approverLevelOptions,
    },
  ],
];
