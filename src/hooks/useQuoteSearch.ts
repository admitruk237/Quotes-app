import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Quote, ErrorResponse } from '@/types/interfaces';
import { API_ENDPOINTS } from '@/constants/api';
import { createSearchQuery } from '@/utils/searchUtils';

export const useQuoteSearch = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const searchQuotes = useCallback(async (searchParams: any) => {
    try {
      setIsLoading(true);
      setSearchSubmitted(true);

      const query = createSearchQuery(searchParams);
      const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}?${query}`);

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        if (!errorData.errors || !Array.isArray(errorData.errors)) {
          toast.error('An unexpected error occurred.');
          return;
        }

        const errorMessages = errorData.errors
          .filter((err) => err.type === 'field')
          .map((err) => `${err.msg} (${err.path}, ${err.value})`);

        errorMessages.forEach((msg) => toast.error(msg));
        return;
      }

      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setQuotes([]);
    setSearchSubmitted(false);
  }, []);

  return {
    quotes,
    isLoading,
    searchSubmitted,
    searchQuotes,
    clearResults,
  };
};
