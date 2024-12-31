'use client';

import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';

import { Content } from '@/components/Content/Content';
import { MaintenanceContractFormInputs } from '@/libs/Forms/MaintenanceContractFormInputs';
import Request from '../../components/Request';
import { UserSession } from '@/types/auth/sign';
import { RequestStatusEnum } from '@/types/requests/enums';
import { useRequestCreate } from '@/hooks/useRequestsCreate';

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
    <FormProvider {...methods}>
      <Request.Form onSubmitForm={methods.handleSubmit(onSubmitForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {MaintenanceContractFormInputs.map((data) => (
              <Request.InputGroup key={uuid4()}>
                {data.map((item) => {
                  if (item.type === 'input') {
                    return (
                      <Request.Input
                        key={uuid4()}
                        labelText={item.labelText}
                        inputName={item.inputName}
                        inputType={item.inputType}
                        required={item.required}
                        readonly={item.id === 1 ? true : false}
                      />
                    );
                  } else {
                    return (
                      <Request.Select
                        key={item.id}
                        inputName={item.inputName}
                        labelText={item.labelText}
                        options={item.options}
                        required={item.required}
                      />
                    );
                  }
                })}
              </Request.InputGroup>
            ))}
          </div>
        </Content>
        <Request.GroupButtons />
      </Request.Form>
    </FormProvider>
  );
};
