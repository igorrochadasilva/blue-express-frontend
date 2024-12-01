'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IRequestBody, TUser } from '../../../types/global/types';
import { createRequest } from '../../../actions/requests';
import RequestForm from './Request/RequestForm/RequestForm';
import { notifyError, notifySuccess } from '../../../toast/notifications';

interface IRequestContent {
  user: TUser;
  FormDataInputs: any[];
  createRequestRouter: string;
}

const RequestContent = ({
  user,
  FormDataInputs,
  createRequestRouter,
}: IRequestContent) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmitForm: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true);

    const res = await createRequest(createRequestRouter, data, user);

    if (res.ok) {
      router.push('/contract-requests');
      notifySuccess('Request Created Successfully.');
    } else {
      notifyError('Error to create a new request.');
    }

    setIsLoading(false);
  };
  return (
    <RequestForm
      user={user}
      isLoading={isLoading}
      FormDataInputs={FormDataInputs}
      onSubmitForm={onSubmitForm}
    />
  );
};

export default RequestContent;
