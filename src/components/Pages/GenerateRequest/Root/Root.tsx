import { ReactNode } from 'react'

interface IRootProps {
  children: ReactNode
}

const Root = async ({ children }: IRootProps) => (
  <div className="mx-10  my-4 p-4  rounded flex justify-between items-center gap-6">{children}</div>
)

export default Root
