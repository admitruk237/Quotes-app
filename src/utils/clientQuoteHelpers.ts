import { toast } from 'react-toastify'
import { fetchQuoteResult } from '@/api/quotes'
import { QuoteType } from '@/types/interfaces'

export const fetchQuoteWithClientHandling = async (
  quoteId: string,
  options?: {
    onValidationError?: (error: string) => void
    onNotFound?: () => void
    onServerError?: (error: string) => void
  }
): Promise<QuoteType | null> => {
  const result = await fetchQuoteResult(quoteId)

  if (!result.success) {
    switch (result.type) {
      case 'validation':
        toast.error(result.error, {
          position: 'top-right',
          autoClose: 5000,
          toastId: 'quote-validation-error',
        })
        options?.onValidationError?.(result.error)
        break

      case 'not_found':
        toast.error('Quote not found', {
          position: 'top-right',
          autoClose: 5000,
          toastId: 'quote-not-found',
        })
        options?.onNotFound?.()
        break

      case 'server_error':
      case 'network_error':
        toast.error('Failed to load quote. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          toastId: 'quote-server-error',
        })
        options?.onServerError?.(result.error)
        break
    }

    return null
  }

  return result.data
}
