'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';

import { MaintenanceContractFormInputs } from '@/libs/Forms/MaintenanceContractFormInputs';
import Request from '../../components/Request';
import { UserSession } from '@/types/auth/sign';
import { RequestStatusEnum } from '@/types/requests/enums';
import { useRequestCreate } from '@/hooks/useRequestsCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMaintenanceContractSchema } from '@/schemas/maintenanceContract/createMaintenanceContract';
import { Form } from '@/components/ui/form';

import { FormContent } from '../../components/FormContent/FormContent';

const INITIAL_MAINTENANCE_CONTRACT_FORM = {
  requesterId: '0',
  requesterName: '',
  clientName: 'clientName',
  clmHeaderNumber: 'clmHeaderNumber',
  clmLineNumber: 'clmLineNumber',
  typeContract: 'new',
  status: RequestStatusEnum.WAITING_FOR_APPROVAL,
  company: 'PD',
  renewStartDate: '2024-12-06',
  renewEndDate: '2024-12-08',
  contractRenewQtd: '0',
  frequency: 'monthly',
  scope: 'scope',
  contractTotalValue: '10',
  dollarExchangeRate: '5',
  totalValueUSD: '50',
  gm: '1',
  renewIndexPercentage: '1',
  index: '1',
  paymentCondition: 'paymentCondition',
  inclusionClauses: 'inclusionClauses',
  inclusionDescription: 'inclusionDescription',
  legalIndemnificationObligations: 'legalIndemnificationObligations',
  legalWarrantyObligations: 'legalWarrantyObligations',
  legalDamageCap: 'legalDamageCap',
  legalDamageCave: 'legalDamageCave',
  legalLiquidatedDamages: 'legalLiquidatedDamages',
  justify: 'justify',
  approvalLevel: 'supervisor',
  phone: '11111',
  contact: 'igor082011@gmail.com',
  antiCorruption: 'yes',
  uf: 'SP',
  sap: 'sp',
};

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
        <Request.GroupButtons />
      </form>
    </Form>
  );
};
