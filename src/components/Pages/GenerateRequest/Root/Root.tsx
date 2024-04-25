import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { ReactNode } from 'react'

interface IRootProps {
  children: ReactNode
}

const Root = ({ children }: IRootProps) => (
  <div className="mx-10  my-4 p-4  rounded flex justify-between items-center">{children}</div>
)

export default Root
