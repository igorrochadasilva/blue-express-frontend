'use server';

import { revalidateTag } from 'next/cache';
import {
  UpdateMaintenanceContractDTO,
  UpdateMaintenanceContractResponse,
} from '../../../types/requests/maintenance.contract';
import { api } from '../../api';
import { getUserSession } from '@/actions/auth/getUserSession';

// TODO - Add authorization to update
export async function putMaintenanceContractById(
  maintenanceContractDTO: UpdateMaintenanceContractDTO
): Promise<UpdateMaintenanceContractResponse> {
  delete maintenanceContractDTO.files;
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/maintenance-contract/${maintenanceContractDTO.id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify(maintenanceContractDTO),
      },
      params: {
        user: user.id,
        role: user.role,
        approver: false,
      },
    });

    revalidateTag('maintenance-contract');

    return response;
  } catch (error) {
    return error as UpdateMaintenanceContractResponse;
  }
}
