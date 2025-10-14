'use client'

import { useQuotePage } from '@/hooks/useQuotePage'
import { PageLoadingSpinner } from '../PageLoadingSpinner'

export const QuotePageClient = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { quote, loading, deleting, deleteQuote } = useQuotePage(params)

  if (loading) {
    return <PageLoadingSpinner />
  }

  if (!quote) {
    return <PageLoadingSpinner />
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <blockquote className="text-2xl font-serif italic text-gray-800 mb-4">
          "{quote.text}"
        </blockquote>

        <div className="mt-4">
          <p className="text-lg text-gray-600 text-right">— {quote.author}</p>

          {quote.categories && (
            <div className="flex gap-2 flex-wrap mt-4">
              {quote.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={deleteQuote}
          disabled={deleting}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {deleting ? 'Deleting...' : 'Delete Quote'}
        </button>
      </div>
    </div>
  )
}
