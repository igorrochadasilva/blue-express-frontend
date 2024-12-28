'use server';

import { IRequestBody, TUser } from '../types/global/types';
import { generateApprovalFormData, generateRequestStatus } from '../libs/utils';
import { revalidateTag } from 'next/cache';

export interface ICreateApproval {
  user: TUser;
  statusAction: string;
  requestData: IRequestBody | undefined;
  justify: string;
  url: string;
}

export const createApproval = async ({
  user,
  statusAction,
  requestData,
  justify,
  url,
}: ICreateApproval) => {
  const requestStatus = generateRequestStatus(statusAction);

  const formatRequestData = {
    status: requestStatus,
  };

  const requestResponse = await fetchData({
    router: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/${url}/${requestData?.id}`,
    method: 'PUT',
    params: {
      user: user?.id,
      role: user?.role,
      approver: true,
    },
    body: formatRequestData,
    tag: [`request-${requestData?.id}-tag`],
  });

  if (requestResponse?.ok) {
    revalidateTag(`request-${requestData?.id}-tag`);

    revalidateTag('requests-tag');

    const formatApprovalData = generateApprovalFormData(
      user,
      requestStatus,
      requestData,
      justify
    );

    const approvalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvals`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatApprovalData),
      }
    );

    const approvalDataResponse = await approvalResponse.json();

    return approvalDataResponse;
  }
};
