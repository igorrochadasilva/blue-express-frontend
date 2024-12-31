'use client';
import { v4 as uuid4 } from 'uuid';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { UserSession } from '@/types/auth/sign';
import Request from '../../../components/Request';
import { Content } from '@/components/Content/Content';
import {
  DistributorRepresentativesContract,
  UpdateDistributorRepresentativesContractDTO,
} from '@/types/requests/distributorRepresentativesContract';
import { DistributorRepresentativesFormInputs } from '@/libs/Forms/DistributionRepresentativesContractFormInputs';
import { isValidApprover } from '@/utils/isValidApprover';
import {
  RequestsRoutesEnum,
  RequestStatusEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { useApproverModal } from '@/hooks/useApproverModal';
import { showSaveButtons } from '@/utils/showSaveButtons';
import { ApproverModal } from '@/components/ApproverModal/ApproverModal';
import { useRequestUpdate } from '@/hooks/useRequestsUpdate';

interface DistributorRepresentativesContractIdProps {
  user: UserSession;
  distributorRepresentativesContractData: DistributorRepresentativesContract;
}

export const DistributorRepresentativesContractId = ({
  user,
  distributorRepresentativesContractData,
}: DistributorRepresentativesContractIdProps) => {
  const { modal, showModal, setApprovalDTO } = useApproverModal();
  const { updateDistributorRepresentativesContract } = useRequestUpdate();

  const methods = useForm<UpdateDistributorRepresentativesContractDTO>({
    mode: 'all',
    defaultValues: {
      ...distributorRepresentativesContractData,
      id: distributorRepresentativesContractData.id,
      commissionPercentage: Number(
        distributorRepresentativesContractData.commissionPercentage
      ),
    },
  });

  const onSubmitForm: SubmitHandler<
    UpdateDistributorRepresentativesContractDTO
  > = (distributorRepresentativesContractDTO) => {
    updateDistributorRepresentativesContract(
      distributorRepresentativesContractDTO
    );
  };

  const showApproverButtons = isValidApprover({
    user: user,
    contractApproverNames:
      distributorRepresentativesContractData.currentApproverName,
    contractStatus: distributorRepresentativesContractData.status,
    contractAuthor: distributorRepresentativesContractData.author,
  });

  const showSaveButtonsValidation = showSaveButtons({
    user,
    contractStatus: distributorRepresentativesContractData.status,
    contractAuthor: distributorRepresentativesContractData.author,
  });

  useEffect(() => {
    showModal(false);
    setApprovalDTO({
      title: RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT,
      typeRequest: RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT,
      author: user.email,
      userID: user.id,
      distributorRepresentativesContractID:
        distributorRepresentativesContractData.id,
      level: distributorRepresentativesContractData.currentLevel,
      routeRequest: RequestsRoutesEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {showApproverButtons && <Request.ApproverButtons />}
        {showSaveButtonsValidation && (
          <Request.GroupButtons
            isFormUpdate={
              distributorRepresentativesContractData.status !==
              RequestStatusEnum.SKETCH
            }
          />
        )}
      </Request.Form>
      {modal && <ApproverModal />}
    </FormProvider>
  );
};
