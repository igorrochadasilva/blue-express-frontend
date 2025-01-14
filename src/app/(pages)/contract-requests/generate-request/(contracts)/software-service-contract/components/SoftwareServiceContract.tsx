'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserSession } from '@/types/auth/sign';
import { PostSoftwareServiceContractDTO } from '@/types/requests/softwaerServiceContract';
import { SoftwareServiceFormInputs } from '@/lib/Forms/SoftwareServiceFormInputs';
import { useRequestCreate } from '@/hooks/useRequestsCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSoftwareServiceContractSchema } from '@/schemas/softwareServiceContract/createSoftwareServiceContract';
import { Form } from '@/components/ui/form';
import { FormContent } from '../../components/FormContent/FormContent';
import { GroupButtons } from '../../components/GroupButtons/GroupButtons';
import { INITIAL_SOFTWARE_SERVICE_CONTRACT_FORM } from '@/mocks/createSoftwareServiceContractMock';

interface SoftwareServiceContractProps {
  userSession: UserSession;
}

export const SoftwareServiceContract = ({
  userSession,
}: SoftwareServiceContractProps) => {
  const { createSoftwareServiceContract } = useRequestCreate();

  const methods = useForm<PostSoftwareServiceContractDTO>({
    resolver: zodResolver(createSoftwareServiceContractSchema()),
    defaultValues: {
      ...INITIAL_SOFTWARE_SERVICE_CONTRACT_FORM,
      requesterName: userSession.name,
    },
  });

  const onSubmitForm: SubmitHandler<PostSoftwareServiceContractDTO> = (
    softwareServiceContractDTO
  ) => {
    createSoftwareServiceContract(softwareServiceContractDTO);
  };

  const inputContractTotalValue = methods.watch('contractTotalValue');
  const inputDollarExchangeRate = methods.watch('dollarExchangeRate');

  useEffect(() => {
    const inputTotalValueUSD =
      Number(inputContractTotalValue) / Number(inputDollarExchangeRate);
    methods.setValue('totalValueUSD', String(inputTotalValueUSD));
  }, [inputContractTotalValue, inputDollarExchangeRate, methods]);

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <FormContent formData={SoftwareServiceFormInputs} />
        <GroupButtons />
      </form>
    </Form>
  );
};
