'use client';
import { v4 as uuid4 } from 'uuid';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { UserSession } from '@/types/auth/sign';
import Request from '../../../components/Request';
import { Content } from '@/components/Content/Content';
import {
  SoftwareServiceContract,
  UpdateSoftwareServiceContractDTO,
} from '@/types/requests/softwaerServiceContract';
import { SoftwareServiceFormInputs } from '@/libs/Forms/SoftwareServiceFormInputs';
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

interface SoftwareServiceContractIdProps {
  user: UserSession;
  softwareServiceContractData: SoftwareServiceContract;
}

export const SoftwareServiceContractId = ({
  user,
  softwareServiceContractData,
}: SoftwareServiceContractIdProps) => {
  const { modal, showModal, setApprovalDTO } = useApproverModal();
  const { updateSoftwareServiceContract } = useRequestUpdate();

  const methods = useForm<UpdateSoftwareServiceContractDTO>({
    mode: 'all',
    defaultValues: {
      ...softwareServiceContractData,
      id: softwareServiceContractData.id,
      contractTotalValue: Number(
        softwareServiceContractData.contractTotalValue
      ),
      dollarExchangeRate: Number(
        softwareServiceContractData.dollarExchangeRate
      ),
      totalValueUSD: Number(softwareServiceContractData.totalValueUSD),
      gm: Number(softwareServiceContractData.gm),
    },
  });

  const onSubmitForm: SubmitHandler<UpdateSoftwareServiceContractDTO> = async (
    softwareServiceContractDTO
  ) => {
    updateSoftwareServiceContract(softwareServiceContractDTO);
  };

  const showApproverButtons = isValidApprover({
    user: user,
    contractAuthor: softwareServiceContractData.author,
    contractApproverNames: softwareServiceContractData.currentApproverName,
    contractStatus: softwareServiceContractData.status,
  });

  const showSaveButtonsValidation = showSaveButtons({
    user,
    contractStatus: softwareServiceContractData.status,
    contractAuthor: softwareServiceContractData.author,
  });

  useEffect(() => {
    showModal(false);
    setApprovalDTO({
      title: RequestsTitleEnum.SOFTWARE_SERVICE_CONTRACT,
      typeRequest: RequestsTitleEnum.SOFTWARE_SERVICE_CONTRACT,
      author: user.email,
      userID: user.id,
      softwareServiceContractID: softwareServiceContractData.id,
      level: softwareServiceContractData.currentLevel,
      routeRequest: RequestsRoutesEnum.SOFTWARE_SERVICE_CONTRACT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {showApproverButtons && <Request.ApproverButtons />}
        {showSaveButtonsValidation && (
          <Request.GroupButtons
            isFormUpdate={
              softwareServiceContractData.status !== RequestStatusEnum.SKETCH
            }
          />
        )}
      </Request.Form>
      {modal && <ApproverModal />}
    </FormProvider>
  );
};
