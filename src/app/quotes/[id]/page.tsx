'use client';
import React, { useEffect } from 'react';
import { Quote } from '@/types/interfaces';
import { API_ENDPOINTS } from '@/constants/api';
import Title from '@/components/Title';

import PreloadingSpiner from '@/components/PreloadingSpiner';
import { toast } from 'react-toastify';

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

function QuotePage(props: QuotePageProps) {
  const { id } = React.use(props.params);

  const [quote, setQuote] = React.useState<null | Quote>(null);

  const fetchQuote = async (quoteId: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}/${quoteId}`);

      const data: Quote = await response.json();
      setQuote(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch quote'
      );
      setQuote(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuote(id);
    }
  }, [id]);

  if (!quote) {
    return (
      <div className="text-center text-3xl mt-6">
        <PreloadingSpiner message="Loading Quote..." />
      </div>
    );
  }

  return (
    <div>
      <Title text={quote.text} />
      <p>{quote.author} </p>
      <p className="text-gray-500">Categories: {quote.categories}</p>
    </div>
  );
}

export default QuotePage;
