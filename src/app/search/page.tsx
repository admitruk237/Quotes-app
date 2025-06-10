'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Quotes from '@/components/Quotes';
import Title from '@/components/Title';
import QuoteCardSkeleton from '@/components/QuoteCardSkeleton';
import { API_ENDPOINTS } from '@/constants/api';
import { createSearchQueryInterface, Quote } from '@/types/interfaces';

const createSearchQuery = ({
  text,
  author,
  category,
}: createSearchQueryInterface) => {
  const params = new URLSearchParams();

  if (text) params.append('text', text);
  if (author) params.append('author', author);
  if (category) params.append('category', category);

  params.append('limit', '10');
  return params;
};

function Search() {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [searchSubmitted, setSearchSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setSearchSubmitted(true);
      const query = createSearchQuery({ text, author, category });
      const response = await fetch(`${API_ENDPOINTS.ALL_QUOTES}?${query}`);
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Title text="Search Quotes" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search by quote text..."
          label="Quote Text"
        />
        <Input
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Search by author name..."
          label="Author Name"
        />
        <Input
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search by category..."
          label="Category"
        />
      </div>

      <Button onClick={handleSearch} text="Search Quotes" />

      {/* Display loading skeletons - only for quote cards */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <QuoteCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Display search results */}
      {!isLoading && quotes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {quotes.map((quote) => (
            <Quotes key={quote.id} quote={quote} />
          ))}
        </div>
      )}

      {/* Display no results message */}
      {!isLoading && searchSubmitted && quotes.length === 0 && (
        <p className="text-center text-3xl mt-6">No Quotes Found.</p>
      )}
    </div>
  );
}

export default Search;
