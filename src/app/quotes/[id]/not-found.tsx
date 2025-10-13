import Link from 'next/link'
import Button from '@/components/ui/button'

const QuoteNotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
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
            <Button text="Back to Home" />
          </Link>
          <Link href="/">
            <Button text="Back to Home" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default QuoteNotFound
