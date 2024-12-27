'use client';

import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { Content } from '@/components/Content/Content';

import { UserSession } from '@/types/auth/sign';
import { RequestStatusEnum } from '@/types/requests/enums';
import { PostSoftwareServiceContractDTO } from '@/types/requests/softwaerServiceContract';
import Request from '../../components/Request';
import { SoftwareServiceFormInputs } from '@/libs/Forms/SoftwareServiceFormInputs';
import { useRequestCreate } from '@/hooks/useRequestsCreate';

const INITIAL_SOFTWARE_SERVICE_CONTRACT_FORM: PostSoftwareServiceContractDTO = {
  requesterName: 'John Doe',
  requesterId: 1,
  clientName: 'Tech Solutions Inc.',
  clmHeaderNumber: 'CLM2024-001',
  clmLineNumber: 'LN002',
  typeContract: 'renovation',
  companyType: 'public',
  company: 'PD',
  status: RequestStatusEnum.WAITING_FOR_APPROVAL,
  renewStartDate: '2024-01-01',
  renewEndDate: '2025-01-01',
  scope: 'Provide annual software maintenance and updates',
  contractTotalValue: 20,
  dollarExchangeRate: 5,
  totalValueUSD: 100,
  gm: 1,
  paymentCondition: 'Quarterly payments',
  inclusionClauses: 'All upgrades and patches are included',
  inclusionDescription: 'Includes major and minor software updates',
  legalIndemnificationObligations: 'Provider indemnifies client',
  legalWarrantyObligations: '12 months on services rendered',
  legalDamageCap: 'Maximum liability $50,000',
  legalDamageCave: 'No damages for natural disasters',
  legalLiquidatedDamages: 'Agreed at $500 per day of delay',
  justify:
    'This contract ensures continuous software support and upgrades as required by SLA.',
  requestId: '',
  currentLevel: 1,
  approvalLevel: 'controller',
  phone: '+1-800-555-1234',
  contact: 'support@techsolutions.com',
  antiCorruption: 'No bribery or unethical practices allowed',
  uf: 'SP',
  sap: 'SAP54321',
};

interface SoftwareServiceContractProps {
  userSession: UserSession;
}

export const SoftwareServiceContract = ({
  userSession,
}: SoftwareServiceContractProps) => {
  const { createSoftwareServiceContract } = useRequestCreate();

  const methods = useForm<PostSoftwareServiceContractDTO>({
    mode: 'all',
    defaultValues: {
      ...INITIAL_SOFTWARE_SERVICE_CONTRACT_FORM,
      requesterName: userSession.name,
    },
  });

  const onSubmitForm: SubmitHandler<PostSoftwareServiceContractDTO> = async (
    softwareServiceContractDTO
  ) => {
    createSoftwareServiceContract(softwareServiceContractDTO);
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
          <div className="flex flex-col gap-4">
            {SoftwareServiceFormInputs.map((data) => (
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
