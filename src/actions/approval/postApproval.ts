'use server';

import { revalidateTag } from 'next/cache';
import { api } from '../api';
import { getUserSession } from '../auth/getUserSession';
import {
  PostApprovalDTO,
  PostApprovalResponse,
} from '@/types/approval/approval';

export async function postApproval(
  data: PostApprovalDTO
): Promise<PostApprovalResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvals`,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          ...data,
          userID: Number(data.userID),
        }),
      },
    });

    revalidateTag('approval');
    revalidateTag('maintenance-contract');

    return response;
  } catch (error) {
    return error as PostApprovalResponse;
  }
}
