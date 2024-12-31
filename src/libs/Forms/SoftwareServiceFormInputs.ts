import { PostSoftwareServiceContractDTO } from '@/types/requests/softwaerServiceContract';
import {
  approverLevelOptions,
  companyOptions,
  companyTypeOptions,
  contractTypeOptions,
  ufOptions,
} from '../options';

export interface SoftwareServiceContractFormInputsProps {
  id: number;
  type: 'input' | 'select';
  labelText: string;
  inputName: keyof PostSoftwareServiceContractDTO;
  inputType?: string;
  readonly: boolean;
  options?: Array<{ value: string; label: string }>;
}

export const SoftwareServiceFormInputs: SoftwareServiceContractFormInputsProps[][] =
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
        labelText: 'Client Name',
        inputName: 'clientName',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 3,
        type: 'input',
        labelText: 'CLM Number (Header)',
        inputName: 'clmHeaderNumber',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 4,
        type: 'input',
        labelText: 'CLM Number (Line)',
        inputName: 'clmLineNumber',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 5,
        type: 'select',
        labelText: 'Contract Type',
        inputName: 'typeContract',
        inputType: '',
        readonly: false,
        options: contractTypeOptions,
      },
      {
        id: 6,
        type: 'select',
        labelText: 'Company',
        inputName: 'company',
        inputType: '',
        readonly: false,
        options: companyOptions,
      },
    ],
    [
      {
        id: 7,
        type: 'input',
        labelText: 'Start Date/Renewal',
        inputName: 'renewStartDate',
        inputType: 'date',
        readonly: false,
      },
      {
        id: 8,
        type: 'input',
        labelText: 'End Date/Renewal',
        inputName: 'renewEndDate',
        inputType: 'date',
        readonly: false,
      },
      {
        id: 9,
        type: 'select',
        labelText: 'Company Type',
        inputName: 'companyType',
        inputType: '',
        readonly: false,
        options: companyTypeOptions,
      },
    ],
    [
      {
        id: 10,
        type: 'input',
        labelText: 'Scope',
        inputName: 'scope',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 11,
        type: 'input',
        labelText: 'Payment Condition',
        inputName: 'paymentCondition',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 12,
        type: 'input',
        labelText: 'Contract Total Value',
        inputName: 'contractTotalValue',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 13,
        type: 'input',
        labelText: 'Dollar Exchange Rate',
        inputName: 'dollarExchangeRate',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 14,
        type: 'input',
        labelText: 'Total Value USD',
        inputName: 'totalValueUSD',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 15,
        type: 'input',
        labelText: 'GM',
        inputName: 'gm',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 16,
        type: 'input',
        labelText: 'Inclusion Clauses',
        inputName: 'inclusionClauses',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 17,
        type: 'input',
        labelText: 'Inclusion Description',
        inputName: 'inclusionDescription',
        inputType: '',
        readonly: false,
      },
      {
        id: 18,
        type: 'input',
        labelText: 'legal Indemnification Obligations',
        inputName: 'legalIndemnificationObligations',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 19,
        type: 'input',
        labelText: 'Legal Warranty Obligations',
        inputName: 'legalWarrantyObligations',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 20,
        type: 'input',
        labelText: 'legal Damage Cap',
        inputName: 'legalDamageCap',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 21,
        type: 'input',
        labelText: 'Legal Damage Cave',
        inputName: 'legalDamageCave',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 22,
        type: 'input',
        labelText: 'Legal Liquidated Damage',
        inputName: 'legalLiquidatedDamages',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 23,
        type: 'input',
        labelText: 'Justify',
        inputName: 'justify',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 24,
        type: 'input',
        labelText: 'Phone',
        inputName: 'phone',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 25,
        type: 'input',
        labelText: 'AntiCorruption',
        inputName: 'antiCorruption',
        inputType: 'text',
        readonly: false,
      },
      {
        id: 26,
        type: 'select',
        labelText: 'UF',
        inputName: 'uf',
        inputType: '',
        readonly: false,
        options: ufOptions,
      },
      {
        id: 27,
        type: 'input',
        labelText: 'SAP',
        inputName: 'sap',
        inputType: 'text',
        readonly: false,
      },
    ],
    [
      {
        id: 28,
        type: 'input',
        labelText: 'Contact',
        inputName: 'contact',
        inputType: 'email',
        readonly: false,
      },
      {
        id: 29,
        type: 'select',
        labelText: 'Approval level',
        inputName: 'approvalLevel',
        inputType: '',
        readonly: false,
        options: approverLevelOptions,
      },
      {
        id: 30,
        type: 'input',
        labelText: 'Upload Files',
        inputType: 'file',
        inputName: 'files',
        readonly: false,
      },
    ],
  ];
