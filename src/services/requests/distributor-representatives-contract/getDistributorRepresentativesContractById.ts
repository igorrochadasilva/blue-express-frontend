'use server';

import { GetDistributorRepresentativesContractByIdResponse } from '@/types/requests/distributorRepresentativesContract';
import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';

export async function getDistributorRepresentativesById(
  id: string
): Promise<GetDistributorRepresentativesContractByIdResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/distributor-representatives-contract/${id}`,
      options: {
        method: 'GET',
        cache: 'force-cache',
      },
      params: {
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'distributor-representatives-contract',
    });

    return response;
  } catch (error) {
    return error as GetDistributorRepresentativesContractByIdResponse;
  }
}
