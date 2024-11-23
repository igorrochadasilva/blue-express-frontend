import {
  approverLevelOptions,
  companyOptions,
  requestTypesOptions,
} from './options';

export const NAFormDataInputs = [
  [
    {
      id: 1,
      type: 'select',
      labelText: 'Approver',
      inputName: 'user',
      inputType: '',
      required: true,
      readonly: false,
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
    },
    {
      id: 3,
      type: 'input',
      labelText: 'Approval Level',
      inputName: 'level',
      inputType: 'number',
      required: true,
      readonly: false,
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
    },
  ],
];
