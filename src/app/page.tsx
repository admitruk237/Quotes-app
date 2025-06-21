'use client';
import Button from '@/components/Button';
import QuoteCardSkeleton from '@/components/QuoteCardSkeleton';
import Quotes from '@/components/Quotes';
import Title from '@/components/Title';
import { API_ENDPOINTS } from '@/constants/api';
import { Quote } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchQuotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_ENDPOINTS.RANDOM_QUOTES}?limit=10`);
      const data = await response.json();

      setQuotes(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
      console.log('Error fetching quotes:', error);
      setQuotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="p-4">
      <Title text="Quotes frontend app" />
      <Button
        className="mb-10"
        onClick={fetchQuotes}
        text="Get Random Quotes"
      />
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <QuoteCardSkeleton key={index} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          quotes.map((quote) => <Quotes key={quote.id} quote={quote} />)}
      </div>
    </div>
  );
}
