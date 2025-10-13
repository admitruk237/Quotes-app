import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ErrorResponse, QuoteType } from '@/types/interfaces'
import { API_ENDPOINTS } from '@/constants/api'
import { createSearchQuery } from '@/utils/searchUtils'

export const useQuoteSearch = () => {
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  let router
  try {
    router = useRouter()
  } catch (error) {
    router = null
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const searchQuotes = useCallback(
    async (searchParams: any) => {
      try {
        setIsLoading(true)
        setSearchSubmitted(true)

        const query = createSearchQuery(searchParams)

        if (isMounted && router?.isReady) {
          try {
            await router.push(`/search?${query}`, undefined, { shallow: true })
          } catch (error) {
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', `/search?${query}`)
            }
          }
        } else if (isMounted && typeof window !== 'undefined') {
          window.history.pushState({}, '', `/search?${query}`)
        }

        const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}?${query}`)

        if (!response.ok) {
          const errorData: ErrorResponse = await response.json()
          if (!errorData.errors || !Array.isArray(errorData.errors)) {
            toast.error('An unexpected error occurred.')
            return
          }

          const errorMessages = errorData.errors
            .filter((err) => err.type === 'field')
            .map((err) => `${err.msg} (${err.path}, ${err.value})`)

          errorMessages.forEach((msg) => toast.error(msg))
          return
        }

        const data = await response.json()
        setQuotes(data)
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        )
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [router, isMounted]
  )

  const clearResults = useCallback(() => {
    setQuotes([])
    setSearchSubmitted(false)
  }, [])

  return {
    quotes,
    isLoading,
    searchSubmitted,
    searchQuotes,
    clearResults,
  }
}
