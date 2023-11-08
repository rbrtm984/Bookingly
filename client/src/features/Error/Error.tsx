import { XCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

type ErrorProps = {
  error: string; // Accepts a string, not an Error object
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Encountered an error rendering Sign Up... 0_0</h3>
          <div className="mt-2 text-sm text-red-700">
            
            <h4 className="text-sm font-medium text-red-800">Error Message:</h4>
                {error}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error;
