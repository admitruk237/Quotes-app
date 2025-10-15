import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function QuoteNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">💬</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quote Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The quote you're looking for doesn't exist or has been removed.
          </p>
          <p className="text-sm text-gray-500">
            Please check the quote ID and try again.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/quotes">
            <Button text="Browse All Quotes" />
          </Link>
          <Link href="/">
            <Button text="Back to Home" />
          </Link>
        </div>
      </div>
    </div>
  )
}
