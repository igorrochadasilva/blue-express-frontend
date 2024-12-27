'use client';
import { v4 as uuid4 } from 'uuid';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  MaintenanceContract,
  UpdateMaintenanceContractDTO,
} from '@/types/requests/maintenance.contract';
import { UserSession } from '@/types/auth/sign';
import Request from '../../../components/Request';
import { Content } from '@/components/Content/Content';
import { MaintenanceContractFormInputs } from '@/libs/Forms/MaintenanceContractFormInputs';
import { ApproverModal } from '@/components/ApproverModal/ApproverModal';
import { isValidApprover } from '@/utils/isValidApprover';
import {
  RequestsRoutesEnum,
  RequestStatusEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { useApproverModal } from '@/hooks/useApproverModal';
import { showSaveButtons } from '@/utils/showSaveButtons';
import { useRequestUpdate } from '@/hooks/useRequestsUpdate';

interface MaintenanceContractIdProps {
  user: UserSession;
  maintenanceContractData: MaintenanceContract;
}

export const MaintenanceContractId = ({
  user,
  maintenanceContractData,
}: MaintenanceContractIdProps) => {
  const { modal, showModal, setApprovalDTO } = useApproverModal();
  const { updateMaintenanceContract } = useRequestUpdate();

  const methods = useForm<UpdateMaintenanceContractDTO>({
    mode: 'all',
    defaultValues: {
      ...maintenanceContractData,
      id: maintenanceContractData.id,
      contractTotalValue: Number(maintenanceContractData.contractTotalValue),
      dollarExchangeRate: Number(maintenanceContractData.dollarExchangeRate),
      totalValueUSD: Number(maintenanceContractData.totalValueUSD),
      gm: Number(maintenanceContractData.gm),
      renewIndexPercentage: Number(
        maintenanceContractData.renewIndexPercentage
      ),
    },
  });

  const onSubmitForm: SubmitHandler<UpdateMaintenanceContractDTO> = async (
    maintenanceContractDTO
  ) => {
    updateMaintenanceContract(maintenanceContractDTO);
  };

  const showApproverButtons = isValidApprover({
    user: user,
    contractApproverNames: maintenanceContractData.currentApproverName,
    contractStatus: maintenanceContractData.status,
    contractAuthor: maintenanceContractData.author,
  });

  const showSaveButtonsValidation = showSaveButtons({
    user,
    contractStatus: maintenanceContractData.status,
    contractAuthor: maintenanceContractData.author,
  });

  useEffect(() => {
    showModal(false);
    setApprovalDTO({
      title: RequestsTitleEnum.MAINTENANCE_CONTRACT,
      typeRequest: RequestsTitleEnum.MAINTENANCE_CONTRACT,
      author: user.email,
      userID: user.id,
      maintenanceContractID: maintenanceContractData.id,
      level: maintenanceContractData.currentLevel,
      routeRequest: RequestsRoutesEnum.MAINTENANCE_CONTRACT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                        register={methods.register}
                        getValues={methods.getValues}
                      />
                    );
                  } else {
                    return (
                      <Request.Select
                        key={item.id}
                        inputName={item.inputName}
                        labelText={item.labelText}
                        options={item.options}
                        register={methods.register}
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
              maintenanceContractData.status !== RequestStatusEnum.SKETCH
            }
          />
        )}
      </Request.Form>
      {modal && <ApproverModal />}
    </FormProvider>
  );
};
