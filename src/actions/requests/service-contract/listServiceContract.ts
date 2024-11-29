'use server';

import { ListSoftwareServiceContractResponse } from '../../../types/requests/softwaerServiceContract';
import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';

export async function listServiceContract(): Promise<ListSoftwareServiceContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/software-service-contract`,
      options: {
        method: 'GET',
      },
      params: {
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'service-contract',
    });

    return response;
  } catch (error) {
    return error as ListSoftwareServiceContractResponse;
  }
}
