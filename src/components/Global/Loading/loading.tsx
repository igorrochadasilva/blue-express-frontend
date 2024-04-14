import { ArrowPathIcon } from '@heroicons/react/24/solid'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-slate-500 w-screen h-screen">
      <button type="button" className="flex items-center gap-4 text-white px-5 py-2 rounded bg-be_first_color" disabled>
        <ArrowPathIcon className="h-10 w-10 animate-spin" />
        Processing...
      </button>
    </div>
  )
}

export default Loading
