import { MouseEventHandler } from 'react'
import { IModalOptions } from '../../ApproverModal'

interface IButtonsProps {
  handleApproverModal: () => void
  handleApproverActionOnRequest: (statusAction: string) => Promise<void>
  disableButton: boolean
  modalOptions: IModalOptions
}

const Buttons = ({
  handleApproverModal,
  handleApproverActionOnRequest,
  disableButton,
  modalOptions,
}: IButtonsProps) => {
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
  )
}

export default Buttons
