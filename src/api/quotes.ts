import { Quote } from '@/types/interfaces';
import { API_ENDPOINTS } from '@/constants/api';

const isValidId = (id: string): boolean => {
  if (!/^\d+$/.test(id.trim())) {
    return false;
  }

  const parsedId = parseInt(id, 10);
  return Number.isInteger(parsedId) && parsedId > 0;
};
// Результат що може містити або дані, або помилку
interface QuoteResult {
  success: boolean;
  data?: Quote;
  error?: string;
}

export const fetchQuoteResult = async (
  quoteId: string
): Promise<QuoteResult> => {
  if (!isValidId(quoteId)) {
    return {
      success: false,
      error: `Invalid quote ID: ${quoteId}. Please provide a valid numeric ID.`,
    };
  }

  try {
    const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}/${quoteId}`);

    if (!response || response.status === 404) {
      return {
        success: false,
        error: `Quote with ID ${quoteId} not found. Please check the ID and try again.`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to load quote with ID ${quoteId}. Server responded with status ${response.status}.`,
      };
    }

    const data: Quote = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Network error occurred while fetching quote',
    };
  }
};
