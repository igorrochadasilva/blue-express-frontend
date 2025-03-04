import { PostDistributorRepresentativesContractDTO } from '@/types/requests/distributorRepresentativesContract';
import { RequestStatusEnum } from '@/types/requests/enums';

export const INITIAL_DISTRIBUTOR_REPRESENTATIVES_CONTRACT_FORM: PostDistributorRepresentativesContractDTO =
  {
    requesterId: '1',
    clmHeaderNumber: '12345',
    clmLineNumber: '54321',
    typeContract: 'renovation',
    company: 'PD',
    status: RequestStatusEnum.WAITING_FOR_APPROVAL,
    renewStartDate: '2023-01-01',
    renewEndDate: '2024-01-01',
    nameRepresentativeDistributor: 'Test Representative',
    vendor: 'Test Vendor',
    commissionPercentage: '5.5',
    manager: 'Manager Name',
    activity: 'Sales Activity',
    justify: 'Justification for contract',
    requestId: 'DRC-001',
    approvalDate: '2023-02-01',
    approvalLevel: 'controller',
    phone: '123-456-7890',
    contact: 'contact@example.com',
    antiCorruption: 'Yes',
    uf: 'SP',
    sap: 'SAP-12345',
    filesName: 'file1.pdf,file2.pdf',
    typeRequestOrder: 'representative',
    files: [],
  };
