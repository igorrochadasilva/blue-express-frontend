'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { UserSession } from '@/types/auth/sign';
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
import { updateDistributorRepresentativeContractSchema } from '@/schemas/distributoRepresentativeContract/updateDistributoRepresentativeContract';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormContent } from '../../../components/FormContent/FormContent';
import { ApproverButtons } from '../../../components/Request/ApproverButtons/ApproverButtons';
import { GroupButtons } from '../../../components/GroupButtons/GroupButtons';

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
    resolver: zodResolver(updateDistributorRepresentativeContractSchema()),
    defaultValues: {
      ...distributorRepresentativesContractData,
      id: distributorRepresentativesContractData.id,
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
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <FormContent formData={DistributorRepresentativesFormInputs} />
        {showApproverButtons && <ApproverButtons />}
        {showSaveButtonsValidation && (
          <GroupButtons
            isFormUpdate={
              distributorRepresentativesContractData.status !==
              RequestStatusEnum.SKETCH
            }
          />
        )}
      </form>
      {modal && <ApproverModal />}
    </Form>
  );
};
