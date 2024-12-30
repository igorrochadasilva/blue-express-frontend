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
import { zodResolver } from '@hookform/resolvers/zod';
import { createMaintenanceContractSchema } from '@/schemas/createMaintenanceContract';
import {
  Form as FormShad,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input as InputShad } from '@/components/ui/input';
import {
  Select as SelectShad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const INITIAL_MAINTENANCE_CONTRACT_FORM = {
  requesterId: 0,
  requesterName: '',
  clientName: 'clientName',
  clmHeaderNumber: 'clmHeaderNumber',
  clmLineNumber: 'clmLineNumber',
  typeContract: 'new',
  status: RequestStatusEnum.WAITING_FOR_APPROVAL,
  company: 'PD',
  renewStartDate: '2024-12-06',
  renewEndDate: '2024-12-08',
  contractRenewQtd: 0,
  frequency: 'monthly',
  scope: 'scope',
  contractTotalValue: 10,
  dollarExchangeRate: 5,
  totalValueUSD: 50,
  gm: 1,
  renewIndexPercentage: 1,
  index: 1,
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

  const onSubmitForm: SubmitHandler<PostMaintenanceContractDTO> = async (
    maintenanceContractDTO
  ) => {
    createMaintenanceContract(maintenanceContractDTO);
  };

  const inputContractTotalValue = methods.watch('contractTotalValue');
  const inputDollarExchangeRate = methods.watch('dollarExchangeRate');

  useEffect(() => {
    const inputTotalValueUSD =
      inputContractTotalValue / inputDollarExchangeRate;
    methods.setValue('totalValueUSD', inputTotalValueUSD);
  }, [inputContractTotalValue, inputDollarExchangeRate, methods]);

  return (
    <FormProvider {...methods}>
      <Request.Form onSubmitForm={methods.handleSubmit(onSubmitForm)}>
        <Content>
          <FormShad {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitForm)}>
              <div className="flex flex-col gap-4">
                {MaintenanceContractFormInputs.map((data) => (
                  <Request.InputGroup key={uuid4()}>
                    {data.map((item) => {
                      return (
                        <FormField
                          key={item.id}
                          control={methods.control}
                          name={item.inputName}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>{item.inputName}</FormLabel>
                              <FormControl>
                                {item.type === 'input' ? (
                                  <InputShad
                                    {...field}
                                    type={item.inputName}
                                    placeholder={item.inputName}
                                    id={item.inputName}
                                    readOnly={item.id === 1 ? true : false}
                                  />
                                ) : (
                                  <SelectShad>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {item.options?.map((option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option?.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </SelectShad>
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </Request.InputGroup>
                ))}
              </div>
            </form>
          </FormShad>
        </Content>
        <Request.GroupButtons />
      </Request.Form>
    </FormProvider>
  );
};
