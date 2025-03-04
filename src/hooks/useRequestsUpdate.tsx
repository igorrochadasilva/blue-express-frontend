import { useRouter } from 'next/navigation';
import { notifyMessage } from '@/utils/notifyMessage';
import { useState } from 'react';
import {
  UpdateMaintenanceContractDTO,
  UpdateMaintenanceContractResponse,
} from '@/types/requests/maintenance.contract';
import { putMaintenanceContractById } from '@/services/requests/maintenance-contract/putMaintenanceContractById';
import {
  UpdateSoftwareServiceContractDTO,
  UpdateSoftwareServiceContractResponse,
} from '@/types/requests/softwaerServiceContract';
import {
  UpdateDistributorRepresentativesContractDTO,
  UpdateDistributorRepresentativesContractResponse,
} from '@/types/requests/distributorRepresentativesContract';
import { putSoftwareServiceContractById } from '@/services/requests/software-service-contract/putSoftwareServiceContractById';
import { putDistributorRepresentativesContractById } from '@/services/requests/distributor-representatives-contract/putDistributorRepresentativesContractById';

export const useRequestUpdate = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestUpdate = async <T extends object>(
    data: T,
    updateFunction: (
      data: T
    ) => Promise<
      | UpdateMaintenanceContractResponse
      | UpdateSoftwareServiceContractResponse
      | UpdateDistributorRepresentativesContractResponse
    >
  ) => {
    setIsLoading(true);
    const response = await updateFunction(data);

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response?.statusCode,
    });

    if (response.statusCode === 200) return router.push('/contract-requests');

    setIsLoading(false);
  };

  const updateMaintenanceContract = async (
    maintenanceContractDTO: UpdateMaintenanceContractDTO
  ) => {
    await handleRequestUpdate(
      maintenanceContractDTO,
      putMaintenanceContractById
    );
  };

  const updateSoftwareServiceContract = async (
    softwareServiceContractDTO: UpdateSoftwareServiceContractDTO
  ) => {
    await handleRequestUpdate(
      softwareServiceContractDTO,
      putSoftwareServiceContractById
    );
  };

  const updateDistributorRepresentativesContract = async (
    distributorRepresentativesContractDTO: UpdateDistributorRepresentativesContractDTO
  ) => {
    await handleRequestUpdate(
      distributorRepresentativesContractDTO,
      putDistributorRepresentativesContractById
    );
  };

  return {
    isLoading,
    updateMaintenanceContract,
    updateSoftwareServiceContract,
    updateDistributorRepresentativesContract,
  };
};
