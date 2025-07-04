import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchQuoteResult, isValidQuoteId } from '@/api/quotes';

import ClientValidationHandler from './ClientValidationHandler';
import PageLoadingSpinner from '@/components/ui/PreloadingSpiner';

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;

  if (!isValidQuoteId(id)) {
    return <ClientValidationHandler message={`Invalid quote ID: "${id}"`} />;
  }

  const result = await fetchQuoteResult(id);

  if (!result.success) {
    switch (result.type) {
      case 'validation':
        return <ClientValidationHandler message={result.error} />;

      case 'not_found':
        notFound();

      case 'server_error':
      case 'network_error':
        throw new Error(result.error);

      default:
        throw new Error('Unknown error occurred');
    }
  }

  const quote = result.data;

  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-6 text-violet-900 dark:text-violet-300">
          {quote.text}
        </h2>
        <p className="text-2xl text-center text-gray-600 dark:text-gray-300 mb-4">
          — {quote.author ? quote.author : 'Unknown Author'}
        </p>
        <div className="flex justify-center flex-wrap gap-3 mt-10">
          {quote.categories.map((category: string) => {
            return (
              <span
                key={category}
                className="text-base bg-violet-200 text-violet-900 py-2 px-4 rounded-lg dark:bg-violet-700 dark:text-violet-200 hover:bg-violet-300 dark:hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
              >
                {category}
              </span>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}

export default QuotePage;
