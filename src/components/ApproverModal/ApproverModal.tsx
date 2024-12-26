import { RequestStatusEnum } from '@/types/requests/enums';
import { ApproverModalComponents } from './Components';
import { useApproverModal } from '@/hooks/useApproverModal';

export interface IModalOptions {
  type: RequestStatusEnum | null;
  color: string;
  showNextLevel: boolean;
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
        showNextLevel: false,
        text: 'information',
      };
    case RequestStatusEnum.DISAPPROVED:
      return {
        type: RequestStatusEnum.DISAPPROVED,
        color: '#EB1400',
        showNextLevel: false,
        text: 'disapprove',
      };
    case RequestStatusEnum.APPROVED:
      return {
        type: RequestStatusEnum.APPROVED,
        color: '#005EB8',
        showNextLevel: true,
        text: 'approve',
      };
    default:
      return {
        type: RequestStatusEnum.APPROVED,
        color: '#005EB8',
        showNextLevel: false,
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
        {modalOptions.showNextLevel && (
          <ApproverModalComponents.NextLevel text="Follow approval for 3rd level" />
        )}
        <ApproverModalComponents.Buttons modalOptions={modalOptions} />
      </ApproverModalComponents.Content>
    </ApproverModalComponents.Root>
  );
};
