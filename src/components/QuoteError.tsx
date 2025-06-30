// components/QuoteError.tsx
'use client';

import { useRouter } from 'next/navigation';

interface QuoteErrorProps {
  id: string;
  message: string;
}

export default function QuoteError({ id, message }: QuoteErrorProps) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-8xl mb-6">🤔</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Oops! Quote Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
            {message}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            But don't worry, we have plenty of other inspiring quotes waiting
            for you!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleGoBack}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg transition-colors duration-300 font-medium"
          >
            ← Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors duration-300 font-medium"
          >
            🏠 Browse All Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
