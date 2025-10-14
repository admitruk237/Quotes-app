import { CreateQuoteForm } from '@/components/form'
import { Title } from '@/components/sections'

export function CreateQuotePage() {
  return (
    <div className="p-4">
      <Title text="Create New Quote" />
      <CreateQuoteForm />
    </div>
  )
}
