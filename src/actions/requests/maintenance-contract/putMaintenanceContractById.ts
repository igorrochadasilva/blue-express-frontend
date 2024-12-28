'use server';

import { revalidateTag } from 'next/cache';
import {
  UpdateMaintenanceContractDTO,
  UpdateMaintenanceContractResponse,
} from '../../../types/requests/maintenance.contract';
import { api } from '../../api';
import { getUserSession } from '@/actions/auth/getUserSession';
import { isApprobation } from '@/utils/validate/isApprobation';
import { RequestStatusEnum } from '@/types/requests/enums';

// TODO - Add authorization to update
export async function putMaintenanceContractById(
  maintenanceContractDTO: UpdateMaintenanceContractDTO
): Promise<UpdateMaintenanceContractResponse> {
  delete maintenanceContractDTO.files;
  const user = await getUserSession();
  const approver = isApprobation({
    contractStatus: maintenanceContractDTO.status as RequestStatusEnum,
    userRole: user.role,
  });

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
        approver,
      },
    });

    revalidateTag('maintenance-contract');

    return response;
  } catch (error) {
    return error as UpdateMaintenanceContractResponse;
  }
}
