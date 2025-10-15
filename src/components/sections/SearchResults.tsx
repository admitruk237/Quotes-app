import { QuoteType } from '@/types/interfaces'
import { QuoteCardSkeleton } from './QuoteCardSkeleton'
import { Quote } from '../Quote'

type Props = {
  quotes: QuoteType[]
  isLoading: boolean
  searchSubmitted: boolean
}

export const SearchResults = ({
  quotes,
  isLoading,
  searchSubmitted,
}: Props) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <QuoteCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (quotes.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {quotes.map((quote) => (
          <Quote
            key={quote.id}
            quote={quote}
          />
        ))}
      </div>
    )
  }

  if (searchSubmitted && quotes.length === 0) {
    return <p className="text-center text-3xl mt-6">No Quotes Found.</p>
  }

  return null
}
