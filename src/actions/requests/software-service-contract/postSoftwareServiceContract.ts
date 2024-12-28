'use server';

import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';
import { revalidateTag } from 'next/cache';
import {
  PostSoftwareServiceContractDTO,
  PostSoftwareServiceContractResponse,
} from '@/types/requests/softwaerServiceContract';

export async function postSoftwareServiceContract(
  data: PostSoftwareServiceContractDTO
): Promise<PostSoftwareServiceContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/software-service-contract`,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          ...data,
          contractTotalValue: Number(data.contractTotalValue),
          dollarExchangeRate: Number(data.dollarExchangeRate),
          gm: Number(data.gm),
          requesterId: Number(user.id),
          totalValueUSD: Number(data.totalValueUSD),
        } as PostSoftwareServiceContractDTO),
      },
      params: {
        email: user.email,
        role: user.role,
      },
      ignoreCache: true,
    });

    revalidateTag('software-service-contract');

    return response;
  } catch (error) {
    return error as PostSoftwareServiceContractResponse;
  }
}
