import { Suspense } from 'react';
import { fetchQuoteResult } from '@/api/quotes';
import PageLoadingSpinner from '@/components/PreloadingSpiner';
import QuoteError from '@/components/QuoteError';
import QuoteDisplay from '@/components/QuoteDisplay';

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;

  if (!id) {
    return <QuoteError id={id} message="Invalid quote ID provided" />;
  }

  const result = await fetchQuoteResult(id);

  if (!result.success) {
    return (
      <QuoteError id={id} message={result.error || 'Failed to load quote'} />
    );
  }

  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <QuoteDisplay quote={result.data} />
    </Suspense>
  );
}

export default QuotePage;
