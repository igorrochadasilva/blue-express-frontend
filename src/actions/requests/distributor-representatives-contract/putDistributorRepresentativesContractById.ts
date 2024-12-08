'use server';

import { revalidateTag } from 'next/cache';
import { api } from '../../api';
import { getUserSession } from '@/actions/auth/getUserSession';
import {
  UpdateDistributorRepresentativesContractDTO,
  UpdateDistributorRepresentativesContractResponse,
} from '@/types/requests/distributorRepresentativesContract';

// TODO - Add authorization to update
export async function putDistributorRepresentativesContractById(
  distributorRepresentativesDTO: UpdateDistributorRepresentativesContractDTO
): Promise<UpdateDistributorRepresentativesContractResponse> {
  delete distributorRepresentativesDTO.files;
  const user = await getUserSession();

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/distributor-representatives-contract/${distributorRepresentativesDTO.id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify(distributorRepresentativesDTO),
      },
      params: {
        user: user.id,
        role: user.role,
        approver: false,
      },
    });

    revalidateTag('distributor-representatives-contract');

    return response;
  } catch (error) {
    return error as UpdateDistributorRepresentativesContractResponse;
  }
}
