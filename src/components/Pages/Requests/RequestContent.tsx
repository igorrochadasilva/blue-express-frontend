'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Request } from '../../../types/global/types';
import RequestForm from './Request/RequestForm/RequestForm';

import { UserSession } from '@/types/auth/sign';
import { FormDataInputs } from '@/types/requests/requests';
import { RequestsTitleEnum } from '@/types/requests/enums';
import { postMaintenanceContract } from '@/actions/requests/maintenance-contract/postMaintenanceContract';
import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';

interface RequestContentProps {
  user: UserSession;
  FormDataInputs: FormDataInputs;
  createRequestRouter: RequestsTitleEnum;
}

const RequestContent = ({
  user,
  FormDataInputs,
  createRequestRouter,
}: RequestContentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmitForm: SubmitHandler<Request> = async (data) => {
    console.log('🚀 ~ constonSubmitForm:SubmitHandler<Request>= ~ data:', data);
    setIsLoading(true);

    const res = await postMaintenanceContract(
      data as unknown as PostMaintenanceContractDTO
    );
    console.log('🚀 ~ constonSubmitForm:SubmitHandler<Request>= ~ res:', res);

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
