'use server';

import { revalidateTag } from 'next/cache';
import {
  UpdateMaintenanceContractDTO,
  UpdateMaintenanceContractResponse,
} from '../../../types/requests/maintenance.contract';
import { api } from '../../api';

// TODO - Add authorization to update
export async function putMaintenanceContractById(
  maintenanceContractDTO: UpdateMaintenanceContractDTO
): Promise<UpdateMaintenanceContractResponse> {
  console.log('🚀 ~ maintenanceContractData:', maintenanceContractDTO);

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/maintenance-contract/${maintenanceContractDTO.id}`,
      options: {
        method: 'PUT',
      },
    });
    console.log('🚀 ~ response:', response);

    revalidateTag('maintenance-contract');

    return response;
  } catch (error) {
    return error as UpdateMaintenanceContractResponse;
  }
}
