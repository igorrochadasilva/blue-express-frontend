import { RequestsData } from '../hooks/useGetRequests';
import { IApprover, IRequestBody, TUser } from '../types/global/types';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const calculateSLA = (date: string) => {
  const requestDate = new Date(date);
  const currentDate = new Date();
  const timeDiffMs = currentDate.getTime() - requestDate.getTime();
  const daysSinceCreation = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

  return daysSinceCreation;
};

export const sortRequestType = (a: IApprover, b: IApprover) => {
  const typeOrder = [
    'Maintenance Contract',
    'Software Service Contract',
    'Distributor Representatives Contract',
  ]; // Desired order
  const aIndex = typeOrder.indexOf(a.type);
  const bIndex = typeOrder.indexOf(b.type);
  return aIndex - bIndex;
};

export const sortNumber = (a: string, b: string) => {
  // Extract the numerical value from the dollar-formatted string:
  const competenceA = parseFloat(a.replace(/\$/g, ''));
  const competenceB = parseFloat(b.replace(/\$/g, ''));

  // Perform numerical comparison:
  return competenceA - competenceB;
};

export const sortAlphabetically = (a: string, b: string) => {
  return a.localeCompare(b); // Alphabetical sorting
};

export const formatToUSD = (value: number) => {
  const formattedValue = value.toFixed(2);
  return `$${formattedValue}`;
};

export const generateRequestKey = (requestTitle: string) => {
  let key = '';

  if (requestTitle === 'Maintenance Contract') {
    key = 'MC';
  } else if (requestTitle === 'Software Service Contract') {
    key = 'SSC';
  } else {
    key = 'DRC';
  }

  return key;
};

export const formatApproverName = (approverNames: string) => {
  const charsToRemove = /\{|\}|"/g;
  const formattedApproversName = approverNames.replace(charsToRemove, '');

  return formattedApproversName;
};

export const generateDefaultValueUseForm = (requestData: IRequestBody) => {
  let defaultValue = {};
  if (requestData.requestId.includes('MC')) {
    defaultValue = {
      ...requestData,
      contractTotalValue: requestData ? requestData?.contractTotalValue : 0,
      dollarExchangeRate: requestData ? requestData?.dollarExchangeRate : 0,
      totalValueUSD: requestData ? requestData?.totalValueUSD : 0,
    };
  } else if (requestData.requestId.includes('SSC')) {
    defaultValue = {
      ...requestData,
      contractTotalValue: requestData ? requestData?.contractTotalValue : 0,
      dollarExchangeRate: requestData ? requestData?.dollarExchangeRate : 0,
      totalValueUSD: requestData ? requestData?.totalValueUSD : 0,
    };
  } else {
    defaultValue = {
      ...requestData,
    };
  }

  return defaultValue;
};

export const generateRequestFormData = (
  requestType: string,
  data: IRequestBody,
  user?: TUser
) => {
  let formatData: IRequestBody = data;

  if (requestType === 'maintenance-contract') {
    formatData = {
      ...data,
      title: 'Maintenance Contract',
      status: 'waiting for approval',
      requester: user?.id,
      contractRenewQtd: Number(data.contractTotalValue),
      contractTotalValue: Number(data.contractTotalValue),
      dollarExchangeRate: Number(data.dollarExchangeRate),
      totalValueUSD: Number(data.totalValueUSD),
      gm: Number(data.gm),
      renewIndexPercentage: Number(data.renewIndexPercentage),
      index: Number(data.index),
    };
  } else if (requestType === 'software-service-contract') {
    formatData = {
      ...data,
      title: 'Software Service Contract',
      status: 'waiting for approval',
      requester: user?.id,
      contractTotalValue: Number(data.contractTotalValue),
      dollarExchangeRate: Number(data.dollarExchangeRate),
      totalValueUSD: Number(data.totalValueUSD),
      gm: Number(data.gm),
    };
  } else {
    formatData = {
      ...data,
      title: 'Distributor Representatives Contract',
      status: 'waiting for approval',
      requester: user?.id,
      commissionPercentage: Number(data.commissionPercentage),
    };
  }

  return formatData;
};

export const generateRequestStatus = (statusAction: string) => {
  switch (statusAction) {
    case 'sketch':
      return 'sketch';

    case 'information':
      return 'waiting for information';

    case 'disapprove':
      return 'disapproved';

    case 'approve':
      return 'approved';

    default:
      return 'waiting for approval';
  }
};

export const generateApprovalFormData = (
  user: TUser,
  requestStatus: string,
  requestData: IRequestBody | undefined,
  justify: string
) => {
  let formatApprovalData = {};

  if (requestData?.requestId.includes('MC')) {
    formatApprovalData = {
      title: `Approval Level ${requestData?.currentLevel}`,
      level: requestData?.currentLevel,
      user: user?.id,
      requestId: requestData?.requestId,
      status: requestStatus,
      justify: justify,
      typeRequest: 'Maintenance Contract',
      author: user?.name,
      approver: user?.id,
      maintenanceContract: requestData?.id,
    };
  } else if (requestData?.requestId.includes('SSC')) {
    formatApprovalData = {
      title: `Approval Level ${requestData?.currentLevel}`,
      level: requestData?.currentLevel,
      user: user?.id,
      requestId: requestData?.requestId,
      status: requestStatus,
      justify: justify,
      typeRequest: 'Software Service Contract',
      author: user?.name,
      approver: user?.id,
      softwareServiceContract: requestData?.id,
    };
  } else {
    formatApprovalData = {
      title: `Approval Level ${requestData?.currentLevel}`,
      level: requestData?.currentLevel,
      user: user?.id,
      requestId: requestData?.requestId,
      status: requestStatus,
      justify: justify,
      typeRequest: 'Distributor Representatives Contract',
      author: user?.name,
      approver: user?.id,
      distributorRepresentativesContract: requestData?.id,
    };
  }

  return formatApprovalData;
};
