import { ReactNode } from 'react'

interface IRootProps {
  children: ReactNode
}

export function Root({ children }: IRootProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[480px] h-[500px] bg-white text-slate-800 rounded">{children}</div>
    </div>
  )
}
