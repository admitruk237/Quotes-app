import { QuoteType } from '@/types/interfaces'
import { Quote } from '../Quote'

type Props = {
  quotes: QuoteType[]
  isLoading: boolean
}

export const Quotes = ({ quotes, isLoading }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {!isLoading &&
        quotes.map((quote) => (
          <Quote
            key={quote.id}
            quote={quote}
          />
        ))}
    </div>
  )
}
