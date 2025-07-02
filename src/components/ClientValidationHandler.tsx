// components/ClientValidationHandler.tsx
'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PageLoadingSpinner from './PreloadingSpiner';

interface ClientValidationHandlerProps {
  message: string;
}

export default function ClientValidationHandler({
  message,
}: ClientValidationHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: 'validation-error',
    });

    const redirectTimeout = setTimeout(() => {
      router.replace('/404');
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [message, router]);

  return <PageLoadingSpinner />;
}
