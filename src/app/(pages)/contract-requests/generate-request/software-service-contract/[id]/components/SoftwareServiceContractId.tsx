'use client';
import { v4 as uuid4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/types/auth/sign';
import Request from '../../../components/Request';
import { Content } from '@/components/Content/Content';
import {
  SoftwareServiceContract,
  UpdateSoftwareServiceContractDTO,
} from '@/types/requests/softwaerServiceContract';
import { SoftwareServiceFormInputs } from '@/libs/Forms/SoftwareServiceFormInputs';
import { putSoftwareServiceContractById } from '@/actions/requests/software-service-contract/putSoftwareServiceContractById';
import { notifyMessage } from '@/utils/notifyMessage';
import { isValidApprover } from '@/utils/isValidApprover';
import {
  RequestsRoutesEnum,
  RequestStatusEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { useApproverModal } from '@/hooks/useApproverModal';
import { showSaveButtons } from '@/utils/showSaveButtons';
import { ApproverModal } from '@/components/ApproverModal/ApproverModal';

interface SoftwareServiceContractIdProps {
  user: UserSession;
  softwareServiceContractData: SoftwareServiceContract;
}

export const SoftwareServiceContractId = ({
  user,
  softwareServiceContractData,
}: SoftwareServiceContractIdProps) => {
  const router = useRouter();
  const { modal, showModal, setApprovalDTO } = useApproverModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, getValues, setValue } =
    useForm<UpdateSoftwareServiceContractDTO>({
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
    const response = await putSoftwareServiceContractById(
      softwareServiceContractDTO
    );

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response?.statusCode,
    });

    if (response.statusCode === 200) return router.push('/contract-requests');

    setIsLoading(false);
  };

  const handleSaveWaitingApproval = () =>
    setValue('status', RequestStatusEnum.WAITING_FOR_APPROVAL);

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
    <>
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
        {showApproverButtons && <Request.ApproverButtons />}
        {showSaveButtonsValidation && (
          <Request.GroupButtons
            isFormUpdate={
              softwareServiceContractData.status !== RequestStatusEnum.SKETCH
            }
            isLoading={isLoading}
            handleSaveWaitingApproval={handleSaveWaitingApproval}
          />
        )}
      </Request.Form>
      {modal && <ApproverModal />}
    </>
  );
};
