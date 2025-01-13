import { useRouter } from 'next/navigation';
import { notifyMessage } from '@/utils/notifyMessage';
import { useState } from 'react';
import {
  PostMaintenanceContractDTO,
  PostMaintenanceContractResponse,
} from '@/types/requests/maintenance.contract';
import {
  PostSoftwareServiceContractDTO,
  PostSoftwareServiceContractResponse,
} from '@/types/requests/softwaerServiceContract';
import {
  PostDistributorRepresentativesContractDTO,
  PostDistributorRepresentativesContractResponse,
} from '@/types/requests/distributorRepresentativesContract';
import { postDistributorRepresentativesContract } from '@/services/requests/distributor-representatives-contract/postDistributorRepresentativesContract';
import { postSoftwareServiceContract } from '@/services/requests/software-service-contract/postSoftwareServiceContract';
import { postMaintenanceContract } from '@/services/requests/maintenance-contract/postMaintenanceContract';

export const useRequestCreate = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCreate = async <T extends object>(
    data: T,
    createFunction: (
      data: T
    ) => Promise<
      | PostMaintenanceContractResponse
      | PostSoftwareServiceContractResponse
      | PostDistributorRepresentativesContractResponse
    >
  ) => {
    setIsLoading(true);
    const response = await createFunction(data);

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response?.statusCode,
    });

    if (response.statusCode === 201) return router.push('/contract-requests');

    setIsLoading(false);
  };

  const createMaintenanceContract = async (
    maintenanceContractDTO: PostMaintenanceContractDTO
  ) => {
    await handleRequestCreate(maintenanceContractDTO, postMaintenanceContract);
  };

  const createSoftwareServiceContract = async (
    softwareServiceContractDTO: PostSoftwareServiceContractDTO
  ) => {
    await handleRequestCreate(
      softwareServiceContractDTO,
      postSoftwareServiceContract
    );
  };

  const createDistributorRepresentativesContract = async (
    distributorRepresentativesContractDTO: PostDistributorRepresentativesContractDTO
  ) => {
    await handleRequestCreate(
      distributorRepresentativesContractDTO,
      postDistributorRepresentativesContract
    );
  };

  return {
    isLoading,
    createMaintenanceContract,
    createSoftwareServiceContract,
    createDistributorRepresentativesContract,
  };
};
