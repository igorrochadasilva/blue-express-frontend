import { ReactNode } from 'react'

interface ITableProps {
  children: ReactNode
}

const Table = ({ children }: ITableProps) => {
  return (
    <div className="flex flex-col justify-normal">
      <table>{children}</table>
    </div>
  )
}

export default Table
