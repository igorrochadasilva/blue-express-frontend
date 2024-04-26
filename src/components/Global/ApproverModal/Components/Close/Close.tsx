import { XMarkIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'

interface ICloseProps {
  text: ReactNode
  handleApproverModal: () => void
}

const Close = ({ text, handleApproverModal }: ICloseProps) => {
  return (
    <div className="flex justify-between mb-4">
      <span className="text-be_first_color text-md font-semibold">{text}</span>
      <XMarkIcon onClick={handleApproverModal} className="h-6 w-6 text-slate-800 text-end cursor-pointer" />
    </div>
  )
}

export default Close
