import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <Button text="Back to Home" />
        </Link>
      </div>
    </div>
  )
}
