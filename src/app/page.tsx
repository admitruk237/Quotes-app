'use client';
import Button from '@/components/Button';
import Quotes from '@/components/Quotes';
import { useEffect, useState } from 'react';

interface Quote {
  id: string;
  text: string;
  author: string;
  categories: string[]; // Assuming categories could be an array of strings
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const RUNDOM_QUOTES_URL = 'http://localhost:3000/quotes/random?limit=10';

  const fetchQuotes = async () => {
    try {
      const response = await fetch(RUNDOM_QUOTES_URL);
      const data = await response.json();

      setQuotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl mb-6">Quotes frontend app</h1>
      <Button fetchQuotes={fetchQuotes} text="Get Random Quotes" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <Quotes key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
}
