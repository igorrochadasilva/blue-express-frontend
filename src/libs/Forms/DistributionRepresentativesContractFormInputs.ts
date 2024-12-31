import { PostDistributorRepresentativesContractDTO } from '@/types/requests/distributorRepresentativesContract';
import {
  approverLevelOptions,
  companyOptions,
  contractTypeOptions,
  typeRequestOrderOptions,
  ufOptions,
} from '../options';

export interface DistributorRepresentativesContractFormInputsProps {
  id: number;
  type: 'input' | 'select';
  labelText: string;
  inputName: keyof PostDistributorRepresentativesContractDTO;
  inputType?: string;
  readonly: boolean;
  options?: Array<{ value: string; label: string }>;
}

export const DistributorRepresentativesFormInputs: DistributorRepresentativesContractFormInputsProps[][] =
  [
    [
      {
        id: 1,
        type: 'input',
        labelText: 'Requester',
        inputName: 'requesterName',
        inputType: 'text',
        readonly: true,
      },
      {
        id: 2,
        type: 'input',
        labelText: 'CLM Number (Header)',
        inputName: 'clmHeaderNumber',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 3,
        type: 'input',
        labelText: 'CLM Number (Line)',
        inputName: 'clmLineNumber',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 4,
        type: 'select',
        labelText: 'Contract Type',
        inputName: 'typeContract',
        inputType: '',
        readonly: false,
        options: contractTypeOptions,
      },
      {
        id: 5,
        type: 'select',
        labelText: 'Company',
        inputName: 'company',
        inputType: '',
        readonly: false,
        options: companyOptions,
      },
      {
        id: 6,
        type: 'input',
        labelText: 'Start Date/Renewal',
        inputName: 'renewStartDate',
        inputType: 'date',
        readonly: false,
      },
    ],
    [
      {
        id: 7,
        type: 'input',
        labelText: 'End Date/Renewal',
        inputName: 'renewEndDate',
        inputType: 'date',
        readonly: false,
      },
      {
        id: 8,
        type: 'select',
        labelText: 'Representative / Distributor',
        inputName: 'typeRequestOrder',
        inputType: '',
        readonly: false,
        options: typeRequestOrderOptions,
      },
      {
        id: 9,
        type: 'input',
        labelText: 'Name Representative / Distributor',
        inputName: 'nameRepresentativeDistributor',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 10,
        type: 'input',
        labelText: 'Vendor',
        inputName: 'vendor',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 11,
        type: 'input',
        labelText: 'Commission Percentage',
        inputName: 'commissionPercentage',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 12,
        type: 'input',
        labelText: 'Manager',
        inputName: 'manager',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 13,
        type: 'input',
        labelText: 'Activity',
        inputName: 'activity',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 14,
        type: 'input',
        labelText: 'Justify',
        inputName: 'justify',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 15,
        type: 'input',
        labelText: 'Phone',
        inputName: 'phone',
        inputType: 'tel',
        readonly: false,
      },
    ],
    [
      {
        id: 16,
        type: 'input',
        labelText: 'AntiCorruption',
        inputName: 'antiCorruption',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 17,
        type: 'select',
        labelText: 'UF',
        inputName: 'uf',
        inputType: '',
        readonly: false,
        options: ufOptions,
      },
      {
        id: 18,
        type: 'input',
        labelText: 'SAP',
        inputName: 'sap',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 19,
        type: 'input',
        labelText: 'Contact',
        inputName: 'contact',
        inputType: 'email',
        readonly: false,
      },
      {
        id: 20,
        type: 'select',
        labelText: 'Approval Level',
        inputName: 'approvalLevel',
        inputType: '',
        readonly: false,
        options: approverLevelOptions,
      },
      {
        id: 21,
        type: 'input',
        labelText: 'Upload Files',
        inputType: 'file',
        inputName: 'files',
        readonly: false,
      },
    ],
  ];
