import { QuotePageClient } from '@/components/sections'
import { QuoteParams } from '@/types/interfaces'

export const QuotePage = ({ params }: QuoteParams) => {
  return <QuotePageClient params={params} />
}
