'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

import { Content } from '@/components/Content/Content';

import { UserSession } from '@/types/auth/sign';

import { RequestStatusEnum } from '@/types/requests/enums';
import Request from '../../components/Request';
import { PostDistributorRepresentativesContractDTO } from '@/types/requests/distributorRepresentativesContract';
import { DistributorRepresentativesFormInputs } from '@/libs/Forms/DistributionRepresentativesContractFormInputs';
import { useRequestCreate } from '@/hooks/useRequestsCreate';

const INITIAL_DISTRIBUTOR_REPRESENTATIVES_CONTRACT_FORM: PostDistributorRepresentativesContractDTO =
  {
    requesterId: 1,
    clmHeaderNumber: '12345',
    clmLineNumber: '54321',
    typeContract: 'renovation',
    company: 'PD',
    status: RequestStatusEnum.WAITING_FOR_APPROVAL,
    renewStartDate: '2023-01-01',
    renewEndDate: '2024-01-01',
    nameRepresentativeDistributor: 'Test Representative',
    vendor: 'Test Vendor',
    commissionPercentage: 5.5,
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
    mode: 'all',
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
    <FormProvider {...methods}>
      <Request.Form onSubmitForm={methods.handleSubmit(onSubmitForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {DistributorRepresentativesFormInputs.map((data) => (
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
