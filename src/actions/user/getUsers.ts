'use server';

import { GetUsersResponse } from '@/types/approvers/user';
import { api } from '../api';
import { getUserSession } from '../auth/getUserSession';

export async function getUsers(): Promise<GetUsersResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/users`,
      options: {
        method: 'GET',
        cache: 'force-cache',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
      params: {
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'users',
    });

    return response;
  } catch (error) {
    return error as GetUsersResponse;
  }
}
