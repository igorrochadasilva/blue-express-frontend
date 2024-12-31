'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  MaintenanceContract,
  UpdateMaintenanceContractDTO,
} from '@/types/requests/maintenance.contract';
import { UserSession } from '@/types/auth/sign';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMaintenanceContractSchema } from '@/schemas/maintenanceContract/updateMaintenanceContract';
import { Form } from '@/components/ui/form';

import { FormContent } from '../../../components/FormContent/FormContent';
import { GroupButtons } from '../../../components/GroupButtons/GroupButtons';
import { ApproverButtons } from '../../../components/Request/ApproverButtons/ApproverButtons';

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
    resolver: zodResolver(updateMaintenanceContractSchema()),
    defaultValues: {
      ...maintenanceContractData,
      id: maintenanceContractData.id,
    },
  });

  const onSubmitForm: SubmitHandler<UpdateMaintenanceContractDTO> = (
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
      maintenanceContractID: Number(maintenanceContractData.id),
      level: Number(maintenanceContractData.currentLevel),
      routeRequest: RequestsRoutesEnum.MAINTENANCE_CONTRACT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(methods.formState.errors);
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <FormContent formData={MaintenanceContractFormInputs} />
        {showApproverButtons && <ApproverButtons />}
        {showSaveButtonsValidation && (
          <GroupButtons
            isFormUpdate={
              maintenanceContractData.status !== RequestStatusEnum.SKETCH
            }
          />
        )}
      </form>
      {modal && <ApproverModal />}
    </Form>
  );
};
