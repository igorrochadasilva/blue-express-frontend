'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { UserSession } from '@/types/auth/sign';

import { RequestStatusEnum } from '@/types/requests/enums';
import { PostDistributorRepresentativesContractDTO } from '@/types/requests/distributorRepresentativesContract';
import { DistributorRepresentativesFormInputs } from '@/libs/Forms/DistributionRepresentativesContractFormInputs';
import { useRequestCreate } from '@/hooks/useRequestsCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDistributorRepresentativeContractSchema } from '@/schemas/distributoRepresentativeContract/createDistributorRepresentativeContract';
import { Form } from '@/components/ui/form';
import { FormContent } from '../../components/FormContent/FormContent';
import { GroupButtons } from '../../components/GroupButtons/GroupButtons';

const INITIAL_DISTRIBUTOR_REPRESENTATIVES_CONTRACT_FORM: PostDistributorRepresentativesContractDTO =
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
  };

interface DistributorRepresentativesContractProps {
  userSession: UserSession;
}

export const DistributorRepresentativesContract = ({
  userSession,
}: DistributorRepresentativesContractProps) => {
  const { createDistributorRepresentativesContract } = useRequestCreate();

  const methods = useForm<PostDistributorRepresentativesContractDTO>({
    resolver: zodResolver(createDistributorRepresentativeContractSchema()),
    defaultValues: {
      ...INITIAL_DISTRIBUTOR_REPRESENTATIVES_CONTRACT_FORM,
      requesterName: userSession.name,
    },
  });

  const onSubmitForm: SubmitHandler<
    PostDistributorRepresentativesContractDTO
  > = (distributorRepresentativesContractDTO) => {
    createDistributorRepresentativesContract(
      distributorRepresentativesContractDTO
    );
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <FormContent formData={DistributorRepresentativesFormInputs} />
        <GroupButtons />
      </form>
    </Form>
  );
};
