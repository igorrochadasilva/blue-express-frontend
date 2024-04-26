import { ChangeEvent } from 'react'

interface IJustifyProps {
  handleJustifyApproverModal: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Justify = ({ handleJustifyApproverModal }: IJustifyProps) => {
  return (
    <div className="mb-3">
      <textarea
        onChange={(e) => handleJustifyApproverModal(e)}
        placeholder="provide a justification"
        className="border-[1px] rounded w-full h-[100px] p-2"
        name="justify"
        id=""
      ></textarea>
    </div>
  )
}

export default Justify
