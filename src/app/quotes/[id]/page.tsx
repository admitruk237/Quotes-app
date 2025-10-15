import { QuotePageClient } from '@/components/sections'
import { QuoteParams } from '@/types/interfaces'

export default function QuotePage({ params }: QuoteParams) {
  return <QuotePageClient params={params} />
}
