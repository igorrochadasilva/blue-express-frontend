import { XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function IconClose() {
  return (
    <div className="flex justify-end">
      <Link href="/">
        <XMarkIcon className="h-6 w-6 text-slate-800 text-end cursor-pointer" />
      </Link>
    </div>
  )
}
