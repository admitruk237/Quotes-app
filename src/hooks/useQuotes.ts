import { API_ENDPOINTS } from '@/constants/api'
import { QuoteType } from '@/types/interfaces'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchQuotes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_ENDPOINTS.RANDOM_QUOTES}?limit=10`)
      const data = await response.json()

      setQuotes(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
      console.log('Error fetching quotes:', error)
      setQuotes([])
    } finally {
      setIsLoading(false)
    }
  }

  return { quotes, isLoading, fetchQuotes }
}
