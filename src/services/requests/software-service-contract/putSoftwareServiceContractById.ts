'use server';

import { revalidateTag } from 'next/cache';
import { api } from '../../api';
import {
  UpdateSoftwareServiceContractDTO,
  UpdateSoftwareServiceContractResponse,
} from '@/types/requests/softwaerServiceContract';
import { getUserSession } from '@/services/auth/getUserSession';
import { RequestStatusEnum } from '@/types/requests/enums';
import { isApprobation } from '@/utils/isApprobation';

// TODO - Add authorization to update
export async function putSoftwareServiceContractById(
  softwareServiceContractDTO: UpdateSoftwareServiceContractDTO
): Promise<UpdateSoftwareServiceContractResponse> {
  delete softwareServiceContractDTO.files;
  const user = await getUserSession();
  const approver = isApprobation({
    contractStatus: softwareServiceContractDTO.status as RequestStatusEnum,
    userRole: user.role,
  });

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
        approver,
      },
    });

    revalidateTag('software-service-contract');

    return response;
  } catch (error) {
    return error as UpdateSoftwareServiceContractResponse;
  }
}
