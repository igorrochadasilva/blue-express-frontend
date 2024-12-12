'use server';

import { revalidateTag } from 'next/cache';
import { api } from '../../api';
import {
  UpdateSoftwareServiceContractDTO,
  UpdateSoftwareServiceContractResponse,
} from '@/types/requests/softwaerServiceContract';
import { getUserSession } from '@/actions/auth/getUserSession';

// TODO - Add authorization to update
export async function putSoftwareServiceContractById(
  softwareServiceContractDTO: UpdateSoftwareServiceContractDTO
): Promise<UpdateSoftwareServiceContractResponse> {
  delete softwareServiceContractDTO.files;
  const user = await getUserSession();
  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/software-service-contract/${softwareServiceContractDTO.id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify(softwareServiceContractDTO),
      },
      params: {
        user: user.id,
        role: user.role,
        approver: user.role !== 1,
      },
    });

    revalidateTag('software-service-contract');

    return response;
  } catch (error) {
    return error as UpdateSoftwareServiceContractResponse;
  }
}
