import { QuoteType } from '@/types/interfaces'
import { API_ENDPOINTS } from '@/constants/api'

export const isValidQuoteId = (id: string): boolean => {
  if (!id || typeof id !== 'string') {
    return false
  }

  const trimmedId = id.trim()

  if (!/^\d+$/.test(trimmedId)) {
    return false
  }

  const parsedId = parseInt(trimmedId, 10)
  return (
    Number.isInteger(parsedId) &&
    parsedId > 0 &&
    parsedId <= Number.MAX_SAFE_INTEGER
  )
}

interface QuoteSuccessResult {
  success: true
  data: QuoteType
}

interface QuoteErrorResult {
  success: false
  error: string
  type: 'validation' | 'not_found' | 'server_error' | 'network_error'
}

type QuoteResult = QuoteSuccessResult | QuoteErrorResult

export const fetchQuoteResult = async (
  quoteId: string
): Promise<QuoteResult> => {
  if (!isValidQuoteId(quoteId)) {
    return {
      success: false,
      error: `Invalid quote ID format: "${quoteId}". ID must be a positive number.`,
      type: 'validation',
    }
  }

  try {
    const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}/${quoteId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 404) {
      return {
        success: false,
        error: `Quote with ID ${quoteId} not found.`,
        type: 'not_found',
      }
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Server error: ${response.status} ${response.statusText}`,
        type: 'server_error',
      }
    }

    const data: QuoteType = await response.json()

    if (!data || typeof data !== 'object') {
      return {
        success: false,
        error: 'Invalid quote data received from server.',
        type: 'server_error',
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Network connection failed',
      type: 'network_error',
    }
  }
}
