'use client'

import Button from '@/components/ui/button'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    const toastId = toast.error(
      'An unexpected error occurred. Please try again.',
      {
        autoClose: 5000,
      }
    )

    return () => {
      toast.dismiss(toastId)
    }
  }, [error])

  const handleGoHome = () => {
    toast.dismiss()

    window.location.href = '/'
  }

  const handleTryAgain = () => {
    toast.dismiss()
    reset()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🚨</div>
        <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">
          Unexpected Error
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Something went wrong on our end.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          This error has been logged and we'll look into it.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleTryAgain}
          text="Try Again"
        />
        <Button
          onClick={handleGoHome}
          text="Back to Home"
        />
      </div>
    </div>
  )
}
