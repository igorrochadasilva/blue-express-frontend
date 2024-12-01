'use server';

import { GetDistributorRepresentativesContractResponse } from '../../../types/requests/distributorRepresentativesContract';
import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';

export async function getDistributorRepresentativesContract(): Promise<GetDistributorRepresentativesContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/distributor-representatives-contract`,
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
    return error as GetDistributorRepresentativesContractResponse;
  }
}
