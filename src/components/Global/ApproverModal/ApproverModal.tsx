import { XMarkIcon } from '@heroicons/react/24/solid'
import { MouseEventHandler } from 'react'

interface IApproverModal {
  handleApproverModal: () => void
  modalStatus: string
}

interface IModalOptions {
  color?: string
  showNextLevel?: boolean
  text?: string
}

const ApproverModal = ({ handleApproverModal, modalStatus }: IApproverModal) => {
  let modalOptions: IModalOptions = {}

  if (modalStatus === 'information') {
    modalOptions = {
      color: '#ED8B00',
      showNextLevel: false,
      text: 'confirm',
    }
  } else if (modalStatus === 'disapprove') {
    modalOptions = {
      color: '#EB1400',
      showNextLevel: false,
      text: 'disapprove',
    }
  } else if (modalStatus === 'forward') {
    modalOptions = {
      color: '#005EB8',
      showNextLevel: true,
      text: 'approve',
    }
  } else {
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
          <button style={{ background: modalOptions.color }} className={`flex-1 rounded h-10 text-white font-medium`}>
            {modalOptions.text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApproverModal
