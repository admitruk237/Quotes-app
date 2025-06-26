import { Quote } from '@/types/interfaces';
import { API_ENDPOINTS } from '@/constants/api';

const isValidId = (id: string): boolean => {
  if (!/^\d+$/.test(id.trim())) {
    return false;
  }

  const parsedId = parseInt(id, 10);
  return Number.isInteger(parsedId) && parsedId > 0;
};

export const fetchQuote = async (quoteId: string): Promise<Quote> => {
  if (!isValidId(quoteId)) {
    throw new Error(`Invalid quote ID: ${quoteId}`);
  }

  try {
    const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}/${quoteId}`);

    if (!response || response.status === 404) {
      throw new Error(`Quote with ID ${quoteId} not found`);
    }

    if (!response.ok) {
      throw new Error(`Quote with ID ${quoteId}: Not Found`);
    }

    const data: Quote = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch quote';
    throw new Error(errorMessage);
  }
};
