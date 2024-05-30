'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Content from '../../../components/Global/Content/Content'

interface IError {
  error: Error & { digest?: string }
}

export default function Error({ error }: IError) {
  return (
    <Content>
      <div className="flex items-center gap-2">
        <ExclamationCircleIcon className="w-8 text-red-600" />
        <h2>{error.message}</h2>
      </div>
    </Content>
  )
}
