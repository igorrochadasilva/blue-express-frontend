'use server';

import { ListMaintenanceContractResponse } from '../../../types/requests/maintenance.contract';
import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';

export async function listMaintenanceContract(): Promise<ListMaintenanceContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/maintenance-contract`,
      options: {
        method: 'GET',
      },
      params: {
        email: user.email,
        role: user.role,
      },
      revalidateTag: 'maintenance-contract',
    });

    return response;
  } catch (error) {
    return error as ListMaintenanceContractResponse;
  }
}
