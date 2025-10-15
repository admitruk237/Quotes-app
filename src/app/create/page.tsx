'use client'
import { CreateQuoteForm } from '@/components/form'
import { Title } from '@/components/sections'

const CreateQuotePage = () => {
  return (
    <div className="p-4">
      <Title text="Create New Quote" />
      <CreateQuoteForm />
    </div>
  )
}
export default CreateQuotePage
