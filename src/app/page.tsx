'use client'
import { useEffect } from 'react'
import { QuoteCardSkeleton, Quotes, Title } from '@/components/sections'
import { Button } from '@/components/ui/button'
import { useQuotes } from '@/hooks/useQuotes'

export default function RandomQuotesPage() {
  const { quotes, isLoading, fetchQuotes } = useQuotes()

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="p-4">
      <Title text="Quotes frontend app" />
      <Button
        className="mb-10"
        onClick={fetchQuotes}
        text="Get Random Quotes"
      />
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <QuoteCardSkeleton key={index} />
          ))}
        </div>
      )}
      {!isLoading && (
        <Quotes
          quotes={quotes}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
