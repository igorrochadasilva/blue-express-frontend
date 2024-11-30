'use server';

import { GetSoftwareServiceContractResponse } from '../../../types/requests/softwaerServiceContract';
import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';

export async function getServiceContract(): Promise<GetSoftwareServiceContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/software-service-contract`,
      options: {
        method: 'GET',
        cache: 'force-cache',
      },
      params: {
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'software-service-contract',
    });

    return response;
  } catch (error) {
    return error as GetSoftwareServiceContractResponse;
  }
}
