'use client';

import { SubmitHandler } from 'react-hook-form';
import { IRequestBody, TUser } from '../../../types/global/types';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import RequestForm from '../Requests/Request/RequestForm/RequestForm';
import ApproverModal from '../../Global/ApproverModal/ApproverModal';
import { createApproval } from '../../../actions/approvals';
import { updateRequest } from '../../../actions/requests';
import {
  notifyDefaultError,
  notifyError,
  notifySuccess,
} from '../../../toast/notifications';

interface IDynamicRequestContent {
  user: TUser;
  requestData: IRequestBody;
  FormDataInputs: any[];
  requestRouteType: string;
}

const DynamicRequestContent = ({
  user,
  requestData,
  FormDataInputs,
  requestRouteType,
}: IDynamicRequestContent) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  //approver modal states
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [justifyApproverModal, setJustifyApproverModal] = useState('');

  const onSubmitForm: SubmitHandler<IRequestBody> = async (data) => {
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

export default DynamicRequestContent;
