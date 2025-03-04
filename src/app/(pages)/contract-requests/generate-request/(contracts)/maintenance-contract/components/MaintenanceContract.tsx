'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';

import { MaintenanceContractFormInputs } from '@/lib/Forms/MaintenanceContractFormInputs';
import { UserSession } from '@/types/auth/sign';
import { useRequestCreate } from '@/hooks/useRequestsCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMaintenanceContractSchema } from '@/schemas/maintenanceContract/createMaintenanceContract';
import { Form } from '@/components/ui/form';

import { FormContent } from '../../components/FormContent/FormContent';
import { GroupButtons } from '../../components/GroupButtons/GroupButtons';
import { INITIAL_MAINTENANCE_CONTRACT_FORM } from '@/mocks/createMaintenanceContractMock';

interface MaintenanceContractProps {
  userSession: UserSession;
}

export const MaintenanceContract = ({
  userSession,
}: MaintenanceContractProps) => {
  const { createMaintenanceContract } = useRequestCreate();

  const methods = useForm<PostMaintenanceContractDTO>({
    resolver: zodResolver(createMaintenanceContractSchema()),
    defaultValues: {
      ...INITIAL_MAINTENANCE_CONTRACT_FORM,
      requesterName: userSession.name,
    },
  });

  const onSubmitForm: SubmitHandler<PostMaintenanceContractDTO> = (
    maintenanceContractDTO
  ) => {
    createMaintenanceContract(maintenanceContractDTO);
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
        <FormContent formData={MaintenanceContractFormInputs} />
        <GroupButtons />
      </form>
    </Form>
  );
};
