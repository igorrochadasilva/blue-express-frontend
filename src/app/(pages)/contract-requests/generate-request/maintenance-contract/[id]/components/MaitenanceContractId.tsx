'use client';

import { SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MaintenanceContract,
  UpdateMaintenanceContractDTO,
} from '@/types/requests/maintenance.contract';
import { UserSession } from '@/types/auth/sign';

interface MaintenanceContractIdProps {
  user: UserSession;
  maintenanceContractData: MaintenanceContract;
}

export const MaintenanceContractId = ({
  user,
  maintenanceContractData,
}: MaintenanceContractIdProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [justifyApproverModal, setJustifyApproverModal] = useState('');

  const onSubmitForm: SubmitHandler<UpdateMaintenanceContractDTO> = async (
    data
  ) => {
    setIsLoading(true);

    const res = await updateRequest(user, requestRouteType, data);

    if (res) {
      router.push('/contract-requests');
    }
    setIsLoading(false);
  };

  const handleApproverActionOnRequest = async (statusAction: string) => {
    const data = {
      user: user,
      statusAction: statusAction,
      requestData: requestData,
      justify: justifyApproverModal,
      url: requestRouteType,
    };

    setIsLoading(true);

    const res = await createApproval(data);

    if (res.ok) {
      notifySuccess(res);
      router.push('/contract-requests');
    } else {
      res ? notifyError(res.message) : notifyDefaultError();
      setJustifyApproverModal('');
      setIsLoading(false);
      setShowApproverModal(!showApproverModal);
    }
  };

  const handleApproverModal = () => {
    setShowApproverModal(!showApproverModal), setJustifyApproverModal('');
  };

  const handleModalStatus = (status: string) => setModalStatus(status);

  const handleJustifyApproverModal = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => setJustifyApproverModal(event.target.value);

  return (
    <>
      <RequestForm
        FormDataInputs={FormDataInputs}
        handleApproverModal={handleApproverModal}
        onSubmitForm={onSubmitForm}
        isLoading={isLoading}
        user={user}
        requestData={requestData}
        handleModalStatus={handleModalStatus}
      />
      {showApproverModal && (
        <ApproverModal
          handleJustifyApproverModal={handleJustifyApproverModal}
          handleApproverActionOnRequest={handleApproverActionOnRequest}
          handleApproverModal={handleApproverModal}
          modalStatus={modalStatus}
          justifyApproverModal={justifyApproverModal}
        />
      )}
    </>
  );
};
