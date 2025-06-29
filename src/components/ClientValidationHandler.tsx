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
    // Показуємо тост з помилкою
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000, // Зменшили час автозакриття
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: 'validation-error',
    });

    // Затримуємо редірект на 2 секунди, щоб користувач встиг прочитати тост
    const redirectTimeout = setTimeout(() => {
      router.replace('/404');
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [message, router]);

  // Показуємо повідомлення поки чекаємо на редірект
  return <PageLoadingSpinner />;
}
