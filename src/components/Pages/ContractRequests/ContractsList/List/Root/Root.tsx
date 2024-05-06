import { ReactNode } from 'react'

interface IRootProps {
  children: ReactNode
}

const Root = ({ children }: IRootProps) => {
  return (
    <div className="flex flex-col justify-normal  text-sm">
      <table>{children}</table>
    </div>
  )
}

export default Root
