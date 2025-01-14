'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { UserSession } from '@/types/auth/sign';

import { PostDistributorRepresentativesContractDTO } from '@/types/requests/distributorRepresentativesContract';
import { DistributorRepresentativesFormInputs } from '@/lib/Forms/DistributionRepresentativesContractFormInputs';
import { useRequestCreate } from '@/hooks/useRequestsCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDistributorRepresentativeContractSchema } from '@/schemas/distributoRepresentativeContract/createDistributorRepresentativeContract';
import { Form } from '@/components/ui/form';
import { FormContent } from '../../components/FormContent/FormContent';
import { GroupButtons } from '../../components/GroupButtons/GroupButtons';
import { INITIAL_DISTRIBUTOR_REPRESENTATIVES_CONTRACT_FORM } from '@/mocks/createDistributorRepresentativeMock';

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
