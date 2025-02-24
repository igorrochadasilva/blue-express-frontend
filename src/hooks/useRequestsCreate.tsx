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
import { PostContractsDTO } from '@/types/requests/requests';
import { postFiles } from '@/services/upload/postFiles';
import { RequestsKeyEnum, RequestsTitleEnum } from '@/types/requests/enums';
import { postMaintenanceContract } from '@/services/requests/maintenance-contract/postMaintenanceContract';

export const useRequestCreate = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCreate = async <T extends PostContractsDTO>(
    requestAcronym: RequestsKeyEnum,
    contractType: RequestsTitleEnum,
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
    console.log('🚀 ~ useRequestCreate ~ data:', data);
    if (response.statusCode === 201) {
      if (data.files && data.files.length > 0)
        await postFiles({
          files: data.files,
          additionalData: {
            contractId: '20',
            contractType,
            requestAcronym,
          },
        });
      return router.push('/contract-requests');
    }

    setIsLoading(false);
  };

  const createMaintenanceContract = async (
    maintenanceContractDTO: PostMaintenanceContractDTO
  ) => {
    console.log(
      '🚀 ~ useRequestCreate ~ maintenanceContractDTO:',
      maintenanceContractDTO
    );
    await handleRequestCreate(
      RequestsKeyEnum.MAINTENANCE_CONTRACT_KEY,
      RequestsTitleEnum.MAINTENANCE_CONTRACT,
      maintenanceContractDTO,
      postMaintenanceContract
    );
  };

  const createSoftwareServiceContract = async (
    softwareServiceContractDTO: PostSoftwareServiceContractDTO
  ) => {
    await handleRequestCreate(
      RequestsKeyEnum.SOFTWARE_SERVICE_CONTRACT_KEY,
      RequestsTitleEnum.SOFTWARE_SERVICE_CONTRACT,
      softwareServiceContractDTO,
      postSoftwareServiceContract
    );
  };

  const createDistributorRepresentativesContract = async (
    distributorRepresentativesContractDTO: PostDistributorRepresentativesContractDTO
  ) => {
    await handleRequestCreate(
      RequestsKeyEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT_KEY,
      RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT,
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
