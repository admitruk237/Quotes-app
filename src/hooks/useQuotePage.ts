import { fetchQuoteResult, isValidQuoteId } from '@/api/quotes'
import { API_ENDPOINTS } from '@/constants/api'
import { QuoteType } from '@/types/interfaces'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

export const useQuotePage = (paramsPromise: Promise<{ id: string }>) => {
  const [quote, setQuote] = useState<QuoteType | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [id, setId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const { id: quoteId } = await paramsPromise // ✅ Тепер працює
        setId(quoteId)

        if (!isValidQuoteId(quoteId)) {
          router.replace('/quotes')
          return
        }

        const result = await fetchQuoteResult(quoteId)

        if (!result.success) {
          if (result.type === 'not_found') {
            router.replace('/404')
          } else {
            router.replace('/quotes')
          }
          return
        }

        setQuote(result.data)
      } catch (error) {
        router.replace('/quotes')
      } finally {
        setLoading(false)
      }
    }

    loadQuote()
  }, [paramsPromise, router])

  const deleteQuote = async () => {
    if (!id) return

    setDeleting(true)
    try {
      const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/quotes')
      }
    } catch (error) {
      console.error('Failed to delete quote:', error)
    } finally {
      setDeleting(false)
    }
  }

  return {
    quote,
    loading,
    deleting,
    id,
    deleteQuote,
  }
}
