import { Title } from '@/components/sections'
import { SearchQuotesClient } from '@/components/sections/SearchQuotesClient'

export default function SearchQuotesPage() {
  return (
    <div>
      <Title text="Search Quotes" />
      <SearchQuotesClient />
    </div>
  )
}
