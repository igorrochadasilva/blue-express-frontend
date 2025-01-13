'use server';

import { GetApproversResponse } from '../../types/approvers/approvers';
import { api } from '../api';
import { getUserSession } from '../auth/getUserSession';

export async function getApprovers(): Promise<GetApproversResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvers`,
      options: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
      params: {
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'approvers',
    });

    return response;
  } catch (error) {
    return error as GetApproversResponse;
  }
}
