'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { Content } from '@/components/Content/Content';

import { UserSession } from '@/types/auth/sign';
import { notifyMessage } from '@/utils/notifyMessage';
import { useRouter } from 'next/navigation';
import { RequestStatusEnum } from '@/types/requests/enums';
import { PostSoftwareServiceContractDTO } from '@/types/requests/softwaerServiceContract';
import { postSoftwareServiceContract } from '@/actions/requests/software-service-contract/postSoftwareServiceContract';
import Request from '../../components/Request';
import { SoftwareServiceFormInputs } from '@/libs/Forms/SoftwareServiceFormInputs';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, watch, handleSubmit, setValue, getValues } =
    useForm<PostSoftwareServiceContractDTO>({
      mode: 'all',
      defaultValues: {
        ...INITIAL_SOFTWARE_SERVICE_CONTRACT_FORM,
        requesterName: userSession.name,
      },
    });

  const onSubmitForm: SubmitHandler<PostSoftwareServiceContractDTO> = async (
    data
  ) => {
    setIsLoading(true);
    const response = await postSoftwareServiceContract(data);

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response.statusCode,
    });

    if (response.statusCode === 201) return router.push('/contract-requests');

    setIsLoading(false);
  };

  const inputContractTotalValue = watch('contractTotalValue');
  const inputDollarExchangeRate = watch('dollarExchangeRate');

  useEffect(() => {
    const inputTotalValueUSD =
      inputContractTotalValue / inputDollarExchangeRate;
    setValue('totalValueUSD', inputTotalValueUSD);
  }, [inputContractTotalValue, inputDollarExchangeRate, setValue]);

  return (
    <Request.Form onSubmitForm={handleSubmit(onSubmitForm)}>
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
                      register={register}
                      getValues={getValues}
                    />
                  );
                } else {
                  return (
                    <Request.Select
                      key={item.id}
                      inputName={item.inputName}
                      labelText={item.labelText}
                      options={item.options}
                      register={register}
                      required={item.required}
                    />
                  );
                }
              })}
            </Request.InputGroup>
          ))}
        </div>
      </Content>
      <Request.GroupButtons isLoading={isLoading} />
    </Request.Form>
  );
};
