import { XMarkIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, MouseEventHandler } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { IRequestBody } from '../../../types/global/types'

interface IApproverModal {
  handleJustifyApproverModal: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleApproverActionOnRequest: (statusAction: string) => Promise<void>
  handleApproverModal: () => void
  modalStatus: string
  justifyApproverModal: string
}

interface IModalOptions {
  color: string
  showNextLevel: boolean
  text: string
}

const ApproverModal = ({
  handleJustifyApproverModal,
  handleApproverActionOnRequest,
  handleApproverModal,
  modalStatus,
  justifyApproverModal,
}: IApproverModal) => {
  let modalOptions: IModalOptions = {
    color: '',
    showNextLevel: false,
    text: 'string',
  }

  const disableButton = justifyApproverModal.length === 0 ? true : false

  switch (modalStatus) {
    case 'information':
      modalOptions = {
        color: '#ED8B00',
        showNextLevel: false,
        text: 'information',
      }
      break
    case 'disapprove':
      modalOptions = {
        color: '#EB1400',
        showNextLevel: false,
        text: 'disapprove',
      }
      break
    case 'forward':
      modalOptions = {
        color: '#005EB8',
        showNextLevel: true,
        text: 'approve',
      }
      break
    default:
      modalOptions = {
        color: '#005EB8',
        showNextLevel: false,
        text: 'approve',
      }
  }

  return (
    <div className="fixed inset-0 overflow-hidden flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 transition-opacity text-be_second_color">
      <div className="absolute w-full h-full bg-black opacity-90"></div>
      <div className="z-10 bg-white w-[415px] h-[305px] p-4 rounded">
        <div className="flex justify-between mb-4">
          <span className="text-be_first_color text-md font-semibold">Justify</span>
          <XMarkIcon onClick={handleApproverModal} className="h-6 w-6 text-slate-800 text-end cursor-pointer" />
        </div>
        <div className="mb-3">
          <textarea
            onChange={(e) => handleJustifyApproverModal(e)}
            placeholder="provide a justification"
            className="border-[1px] rounded w-full h-[100px] p-2"
            name="justify"
            id=""
          ></textarea>
        </div>
        {modalOptions.showNextLevel && (
          <div className="mb-4 flex gap-2 flex-col items-start">
            <span className="">Follow approval for 3rd level</span>
            <input className="h-4 w-4" type="checkbox" />
          </div>
        )}

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
      </div>
    </div>
  )
}

export default ApproverModal
