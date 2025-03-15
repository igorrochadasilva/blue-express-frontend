import {
  approverLevelOptions,
  companyOptions,
  contractTypeOptions,
  frequencyOptions,
  ufOptions,
} from '../options';
import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';

export interface MaintenanceContractFormInputsProps {
  id: number;
  type: 'input' | 'select' | 'file' | 'button';
  labelText: string;
  inputName: keyof PostMaintenanceContractDTO;
  inputType?: string;
  readonly?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export const MaintenanceContractFormInputs: MaintenanceContractFormInputsProps[][] =
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
      },
      {
        id: 3,
        type: 'input',
        labelText: 'CLM Number (Header)',
        inputName: 'clmHeaderNumber',
        inputType: 'text',
      },
    ],
    [
      {
        id: 4,
        type: 'input',
        labelText: 'CLM Number (Line)',
        inputName: 'clmLineNumber',
        inputType: 'text',
      },
      {
        id: 5,
        type: 'select',
        labelText: 'Contract Type',
        inputName: 'typeContract',
        inputType: '',

        options: contractTypeOptions,
      },
      {
        id: 6,
        type: 'select',
        labelText: 'Company',
        inputName: 'company',
        inputType: '',

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
      },
      {
        id: 8,
        type: 'input',
        labelText: 'End Date/Renewal',
        inputName: 'renewEndDate',
        inputType: 'date',
      },
      {
        id: 9,
        type: 'input',
        labelText: 'Contract Renew Qtd',
        inputName: 'contractRenewQtd',
        inputType: 'text',
      },
    ],
    [
      {
        id: 10,
        type: 'select',
        labelText: 'Frequency',
        inputName: 'frequency',
        inputType: '',

        options: frequencyOptions,
      },
      {
        id: 11,
        type: 'input',
        labelText: 'Scope',
        inputName: 'scope',
        inputType: 'text',
      },
      {
        id: 12,
        type: 'input',
        labelText: 'Contract Total Value',
        inputName: 'contractTotalValue',
        inputType: 'text',
      },
    ],
    [
      {
        id: 13,
        type: 'input',
        labelText: 'Dollar Exchange Rate',
        inputName: 'dollarExchangeRate',
        inputType: 'text',
      },
      {
        id: 14,
        type: 'input',
        labelText: 'Total Value USD',
        inputName: 'totalValueUSD',
        inputType: 'text',
      },
      {
        id: 15,
        type: 'input',
        labelText: 'GM',
        inputName: 'gm',
        inputType: 'text',
      },
    ],
    [
      {
        id: 16,
        type: 'input',
        labelText: 'Renew Index Percentage',
        inputName: 'renewIndexPercentage',
        inputType: 'text',
      },
      {
        id: 17,
        type: 'input',
        labelText: 'Index',
        inputName: 'index',
        inputType: 'text',
      },
      {
        id: 18,
        type: 'input',
        labelText: 'Payment Condition',
        inputName: 'paymentCondition',
        inputType: 'text',
      },
    ],
    [
      {
        id: 19,
        type: 'input',
        labelText: 'Inclusion Clauses',
        inputName: 'inclusionClauses',
        inputType: 'text',
      },
      {
        id: 20,
        type: 'input',
        labelText: 'Inclusion Description',
        inputName: 'inclusionDescription',
        inputType: 'text',
      },
      {
        id: 21,
        type: 'input',
        labelText: 'legal Indemnification Obligations',
        inputName: 'legalIndemnificationObligations',
        inputType: 'text',
      },
    ],
    [
      {
        id: 22,
        type: 'input',
        labelText: 'legal Warranty Obligations',
        inputName: 'legalWarrantyObligations',
        inputType: 'text',
      },
      {
        id: 23,
        type: 'input',
        labelText: 'legal Damage Cap',
        inputName: 'legalDamageCap',
        inputType: 'text',
      },
      {
        id: 24,
        type: 'input',
        labelText: 'Legal Damage Cave',
        inputName: 'legalDamageCave',
        inputType: 'text',
      },
    ],
    [
      {
        id: 25,
        type: 'input',
        labelText: 'Legal Liquidated Damage',
        inputName: 'legalLiquidatedDamages',
        inputType: 'text',
      },
      {
        id: 26,
        type: 'input',
        labelText: 'Justify',
        inputName: 'justify',
        inputType: 'text',
      },
      {
        id: 27,
        type: 'input',
        labelText: 'Phone',
        inputName: 'phone',
        inputType: 'text',
      },
    ],
    [
      {
        id: 28,
        type: 'input',
        labelText: 'AntiCorruption',
        inputName: 'antiCorruption',
        inputType: 'text',
      },
      {
        id: 29,
        type: 'select',
        labelText: 'UF',
        inputName: 'uf',
        inputType: 'text',

        options: ufOptions,
      },
      {
        id: 30,
        type: 'input',
        labelText: 'SAP',
        inputName: 'sap',
        inputType: 'text',
      },
    ],
    [
      {
        id: 31,
        type: 'input',
        labelText: 'Contact',
        inputName: 'contact',
        inputType: 'email',
      },
      {
        id: 32,
        type: 'select',
        labelText: 'Level Approval',
        inputType: '',
        inputName: 'approvalLevel',
        options: approverLevelOptions,
      },
      {
        id: 33,
        type: 'file',
        labelText: 'Attach File',
        inputType: 'file',
        inputName: 'files',
      },
    ],
  ];
