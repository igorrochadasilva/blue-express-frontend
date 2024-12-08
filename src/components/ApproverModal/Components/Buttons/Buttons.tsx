import { IModalOptions } from '../../ApproverModal';

interface ButtonsProps {
  handleApproverModal: () => void;
  handleApproverActionOnRequest: (statusAction: string) => Promise<void>;
  disableButton: boolean;
  modalOptions: IModalOptions;
}

export const Buttons = ({
  handleApproverModal,
  handleApproverActionOnRequest,
  disableButton,
  modalOptions,
}: ButtonsProps) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={handleApproverModal}
        className="flex-1 rounded h-10 border-[1px] border-be_second_color font-medium"
      >
        Cancel
      </button>
      <button
        disabled={disableButton}
        onClick={() => handleApproverActionOnRequest(modalOptions.text)}
        style={{ background: modalOptions.color }}
        className={`flex-1 rounded h-10 text-white font-medium`}
      >
        {modalOptions.text}
      </button>
    </div>
  );
};
