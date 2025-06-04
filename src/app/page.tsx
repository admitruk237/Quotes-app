'use client';
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
      <div className="text-center mb-10">
        <button
          className="py-3 px-7 text-white rounded-2xl bg-violet-900 cursor-pointer transition-colors duration-300 hover:bg-violet-700"
          onClick={fetchQuotes}
        >
          Get Random Quotes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <div key={quote.id} className="bg-gray-100 p-4 shadow-md rounded-lg">
            <p className="mb-4 text-lg italic">"{quote.text}"</p>
            <p className="text-right mb-10 font-semibold">— {quote.author}</p>
            <div className="flex flex-wrap mt-2">
              {quote.categories.map((category) => (
                <span
                  key={category}
                  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
