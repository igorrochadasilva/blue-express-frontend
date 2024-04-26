import { ReactNode } from 'react'

interface IRootProps {
  children: ReactNode
}

const Root = ({ children }: IRootProps) => {
  return <div className="flex flex-col text-sm">{children}</div>
}

export default Root
