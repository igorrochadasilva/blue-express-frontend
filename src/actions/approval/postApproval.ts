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
  const { data: dto, route } = data;

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvals`,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          ...dto,
          userID: Number(data.data.userID),
        }),
      },
    });

    revalidateTag('approval');
    revalidateTag(route);

    return response;
  } catch (error) {
    return error as PostApprovalResponse;
  }
}
