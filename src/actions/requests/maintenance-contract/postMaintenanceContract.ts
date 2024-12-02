'use server';

import {
  PostMaintenanceContractDTO,
  PostMaintenanceContractResponse,
} from '@/types/requests/maintenance.contract';
import { api } from '../../api';
import { getUserSession } from '../../auth/getUserSession';
import { buildPostMaintenanceContractData } from './build';

export async function postMaintenanceContract(
  data: PostMaintenanceContractDTO
): Promise<PostMaintenanceContractResponse> {
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/maintenance-contract`,
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(buildPostMaintenanceContractData(data, user)),
      },
      params: {
        email: user.email,
        role: user.role,
      },
      ignoreCache: true,
    });

    return response;
  } catch (error) {
    return error as PostMaintenanceContractResponse;
  }
}
