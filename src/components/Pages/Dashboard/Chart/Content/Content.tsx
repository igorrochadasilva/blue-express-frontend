import { ReactNode } from 'react'

interface IContentProps {
  children: ReactNode
}

const Content = ({ children }: IContentProps) => {
  return <div className="flex flex-row align-self justify-around h-[288px]  text-center">{children}</div>
}

export default Content
