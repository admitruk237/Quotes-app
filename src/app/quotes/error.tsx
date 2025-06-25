'use client';

import Button from '@/components/Button';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    toast.error(
      error.message || 'Something went wrong while fetching the quote'
    );
  }, [error]);

  return (
    <div className="text-center p-4">
      <Button onClick={reset} text="Try Agan" />
    </div>
  );
}
