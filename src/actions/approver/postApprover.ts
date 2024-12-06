'use server';

import { revalidateTag } from 'next/cache';
import {
  PostApproverDTO,
  PostApproverResponse,
} from '../../types/approvers/approvers';
import { api } from '../api';
import { getUserSession } from '../auth/getUserSession';
import { buildPostData } from './build';

export async function postApprover(
  data: PostApproverDTO
): Promise<PostApproverResponse> {
  console.log('🚀 ~ data:', data);
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvers`,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(buildPostData(data)),
      },
      params: {
        email: user.email,
        role: user.role,
      },
    });

    revalidateTag('approvers');

    return response;
  } catch (error) {
    return error as PostApproverResponse;
  }
}
