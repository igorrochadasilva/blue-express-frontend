import { ReactNode } from 'react'

interface IRootProps {
  children: ReactNode
}

const Root = ({ children }: IRootProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 transition-opacity text-be_second_color">
      <div className="absolute w-full h-full bg-black opacity-90"></div>
      {children}
    </div>
  )
}

export default Root
