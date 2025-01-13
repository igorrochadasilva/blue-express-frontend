import { RequestStatusEnum } from '@/types/requests/enums';
import { ApproverModalComponents } from './Components';
import { useApproverModal } from '@/hooks/useApproverModal';

export interface IModalOptions {
  type: RequestStatusEnum | null;
  color: string;
  text: string;
}

const getModalOptions = (
  contractStatus: RequestStatusEnum | null
): IModalOptions => {
  switch (contractStatus) {
    case RequestStatusEnum.WAITING_FOR_INFORMATION:
      return {
        type: RequestStatusEnum.WAITING_FOR_INFORMATION,
        color: '#ED8B00',
        text: 'information',
      };
    case RequestStatusEnum.DISAPPROVED:
      return {
        type: RequestStatusEnum.DISAPPROVED,
        color: '#EB1400',
        text: 'disapprove',
      };
    case RequestStatusEnum.APPROVED:
      return {
        type: RequestStatusEnum.APPROVED,
        color: '#005EB8',
        text: 'approve',
      };
    default:
      return {
        type: RequestStatusEnum.APPROVED,
        color: '#005EB8',
        text: 'approve',
      };
  }
};

export const ApproverModal = () => {
  const { modalActionType } = useApproverModal();

  const modalOptions = getModalOptions(modalActionType);

  return (
    <ApproverModalComponents.Root>
      <ApproverModalComponents.Content>
        <ApproverModalComponents.Close text="Justify" />
        <ApproverModalComponents.Justify />
        <ApproverModalComponents.Buttons modalOptions={modalOptions} />
      </ApproverModalComponents.Content>
    </ApproverModalComponents.Root>
  );
};
