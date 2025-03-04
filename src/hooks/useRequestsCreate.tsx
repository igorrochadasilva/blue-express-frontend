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
import { MAX_FILE_SIZE } from '@/utils/constant';
import { useUploadFile } from './useUploadFile';

const handleFileUpload = async (
  files: File[],
  additionalData: {
    contractId: string;
    contractType: RequestsTitleEnum;
    requestAcronym: RequestsKeyEnum;
  }
) => {
  const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);

  if (oversizedFiles.length > 0) {
    const message = `Files exceeding 5MB: ${oversizedFiles.map((f) => f.name).join(', ')}`;
    notifyMessage({ message, statusCode: 400 });
    return { statusCode: 400, message };
  }

  // Create FormData on the client side
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  // Add additional data
  Object.entries(additionalData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return postFiles({ formData });
};

export const useRequestCreate = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedFileUploadFile } = useUploadFile();

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

    const { files, ...dataWithoutFiles } = data;
    const response = await createFunction(dataWithoutFiles as T);

    if (response.statusCode === 201 && files?.length) {
      const contractId = response.data?.message?.split('-')[1]?.split(' ')[0];

      if (!contractId) {
        notifyMessage({
          message: 'Failed to get contract ID',
          statusCode: 400,
        });
        setIsLoading(false);
        return;
      }

      const uploadResponse = (await handleFileUpload(files, {
        contractId,
        contractType,
        requestAcronym,
      })) as { statusCode: number };

      if (uploadResponse.statusCode === 201) {
        notifyMessage({
          message: response?.data?.message ?? response?.message,
          statusCode: response?.statusCode,
        });
        router.push('/contract-requests');
      }
    } else if (response.statusCode === 201) {
      notifyMessage({
        message: response?.data?.message ?? response?.message,
        statusCode: response?.statusCode,
      });
      router.push('/contract-requests');
    }

    setSelectedFileUploadFile([]);
    setIsLoading(false);
  };

  const createMaintenanceContract = async (
    maintenanceContractDTO: PostMaintenanceContractDTO
  ) => {
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
