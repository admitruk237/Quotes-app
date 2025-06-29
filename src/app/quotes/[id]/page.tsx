import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchQuoteResult, isValidQuoteId } from '@/api/quotes';
import PageLoadingSpinner from '@/components/PreloadingSpiner';
import QuoteDisplay from '@/components/QuoteDisplay';

import ClientValidationHandler from '@/components/ClientValidationHandler';

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;

  // Для невалідних ID показуємо тост і 404
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

  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <QuoteDisplay quote={result.data} />
    </Suspense>
  );
}

export default QuotePage;
