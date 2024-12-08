import { ChangeEvent } from 'react';
import { ApproverModalComponents } from './Components';

interface ApproverModalProps {
  handleJustifyApproverModal: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleApproverActionOnRequest: (statusAction: string) => Promise<void>;
  handleApproverModal: () => void;
  modalStatus: string;
  justifyApproverModal: string;
}

export interface IModalOptions {
  color: string;
  showNextLevel: boolean;
  text: string;
}

export const ApproverModal = ({
  handleJustifyApproverModal,
  handleApproverActionOnRequest,
  handleApproverModal,
  modalStatus,
  justifyApproverModal,
}: ApproverModalProps) => {
  let modalOptions: IModalOptions = {
    color: '',
    showNextLevel: false,
    text: 'string',
  };

  const disableButton = justifyApproverModal.length === 0 ? true : false;

  switch (modalStatus) {
    case 'information':
      modalOptions = {
        color: '#ED8B00',
        showNextLevel: false,
        text: 'information',
      };
      break;
    case 'disapprove':
      modalOptions = {
        color: '#EB1400',
        showNextLevel: false,
        text: 'disapprove',
      };
      break;
    case 'forward':
      modalOptions = {
        color: '#005EB8',
        showNextLevel: true,
        text: 'approve',
      };
      break;
    default:
      modalOptions = {
        color: '#005EB8',
        showNextLevel: false,
        text: 'approve',
      };
  }

  return (
    <ApproverModalComponents.Root>
      <ApproverModalComponents.Content>
        <ApproverModalComponents.Close
          handleApproverModal={handleApproverModal}
          text="Justify"
        />
        <ApproverModalComponents.Justify
          handleJustifyApproverModal={handleJustifyApproverModal}
        />
        {modalOptions.showNextLevel && (
          <ApproverModalComponents.NextLevel text="Follow approval for 3rd level" />
        )}
        <ApproverModalComponents.Buttons
          disableButton={disableButton}
          handleApproverActionOnRequest={handleApproverActionOnRequest}
          handleApproverModal={handleApproverModal}
          modalOptions={modalOptions}
        />
      </ApproverModalComponents.Content>
    </ApproverModalComponents.Root>
  );
};
