import { FaceFrownIcon } from '@heroicons/react/24/outline'

interface INoDataBox {
  text: string
}

const NoDataBox = ({ text }: INoDataBox) => {
  return (
    <div className="mt-10 mx-auto flex flex-col justify-center items-center gap-4 w-[400px] p-10 border-[1px] bg-white border-be_second_color rounded">
      <FaceFrownIcon className="w-10" />
      <span className="text-lg">{text}</span>
    </div>
  )
}

export default NoDataBox
