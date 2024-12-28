'use server';

import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';
import { revalidateTag } from 'next/cache';

import {
  PostDistributorRepresentativesContractDTO,
  PostDistributorRepresentativesContractResponse,
} from '@/types/requests/distributorRepresentativesContract';

export async function postDistributorRepresentativesContract(
  data: PostDistributorRepresentativesContractDTO
): Promise<PostDistributorRepresentativesContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/distributor-representatives-contract`,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          ...data,
          requesterId: Number(user.id),
        }),
      },
      params: {
        email: user.email,
        role: user.role,
      },
      ignoreCache: true,
    });

    revalidateTag('distributor-representatives-contract');

    return response;
  } catch (error) {
    return error as PostDistributorRepresentativesContractResponse;
  }
}
