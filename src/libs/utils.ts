import { IRequestBody, TUser } from '../types/global/types';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatToUSD = (value: number) => {
  const formattedValue = value.toFixed(2);
  return `$${formattedValue}`;
};

export const formatApproverName = (approverNames: string) => {
  const charsToRemove = /\{|\}|"/g;
  const formattedApproversName = approverNames.replace(charsToRemove, '');

  return formattedApproversName;
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
