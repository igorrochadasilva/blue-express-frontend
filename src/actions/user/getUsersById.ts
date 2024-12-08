'use server';

import { GetUserApproversResponse } from '@/types/approvers/user';
import { api } from '../api';
import { getUserSession } from '../auth/getUserSession';

export async function getUserApprovers(
  id: number
): Promise<GetUserApproversResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/users/${id}`,
      options: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
      ignoreCache: true,
      params: {
        approvers: 'true',
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'approvers',
    });

    return response;
  } catch (error) {
    return error as GetUserApproversResponse;
  }
}
