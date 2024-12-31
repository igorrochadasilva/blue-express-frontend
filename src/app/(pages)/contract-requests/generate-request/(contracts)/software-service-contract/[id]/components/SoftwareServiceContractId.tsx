'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { UserSession } from '@/types/auth/sign';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { updateSoftwareServiceContractSchema } from '@/schemas/softwareServiceContract/updateSoftwareServiceContract';
import { Form } from '@/components/ui/form';
import { FormContent } from '../../../components/FormContent/FormContent';
import { GroupButtons } from '../../../components/GroupButtons/GroupButtons';
import { ApproverButtons } from '../../../components/ApproverButtons/ApproverButtons';

interface SoftwareServiceContractIdProps {
  user: UserSession;
  softwareServiceContractData: SoftwareServiceContract;
}

export const SoftwareServiceContractId = ({
  user,
  softwareServiceContractData,
}: SoftwareServiceContractIdProps) => {
  console.log('🚀 ~ softwareServiceContractData:', softwareServiceContractData);
  const { modal, showModal, setApprovalDTO } = useApproverModal();
  const { updateSoftwareServiceContract } = useRequestUpdate();

  const methods = useForm<UpdateSoftwareServiceContractDTO>({
    resolver: zodResolver(updateSoftwareServiceContractSchema()),
    defaultValues: {
      ...softwareServiceContractData,
      currentLevel: String(softwareServiceContractData.currentLevel),
      id: softwareServiceContractData.id,
    },
  });
  console.log(methods.formState.errors);
  const onSubmitForm: SubmitHandler<UpdateSoftwareServiceContractDTO> = (
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
      softwareServiceContractID: Number(softwareServiceContractData.id),
      level: Number(softwareServiceContractData.currentLevel),
      routeRequest: RequestsRoutesEnum.SOFTWARE_SERVICE_CONTRACT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <FormContent formData={SoftwareServiceFormInputs} />
        {showApproverButtons && <ApproverButtons />}
        {showSaveButtonsValidation && (
          <GroupButtons
            isFormUpdate={
              softwareServiceContractData.status !== RequestStatusEnum.SKETCH
            }
          />
        )}
      </form>
      {modal && <ApproverModal />}
    </Form>
  );
};
