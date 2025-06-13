'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Quotes from '@/components/Quotes';
import Title from '@/components/Title';
import QuoteCardSkeleton from '@/components/QuoteCardSkeleton';
import { API_ENDPOINTS } from '@/constants/api';
import { createSearchQueryInterface, Quote } from '@/types/interfaces';

//Regex for category validation
const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

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
  const [empty, setEmpty] = useState<null | string>(null);
  const [errors, setErrors] = useState<createSearchQueryInterface>({
    text: '',
    author: '',
    category: '',
  });

  const handleSearch = async () => {
    if (text.trim() === '' && author.trim() === '' && category.trim() === '') {
      return setEmpty('Input field can not be empty'); // Prevent empty search
    }

    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    try {
      setErrors({ text: '', author: '', category: '' });
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

  const getValidationMessage = (
    name: keyof createSearchQueryInterface,
    value: string
  ): string | undefined => {
    switch (name) {
      case 'text':
        if (value && value.length < 2) {
          return 'Text must be at least 2 characters long';
        }
        break;
      case 'author':
        if (value && value.length < 2) {
          return 'Author must be at least 2 characters long';
        }
        break;
      case 'category':
        if (value && !CATEGORY_NAME_REGEX.test(value)) {
          return 'Category can only contain lowercase letters, numbers, and dashes';
        }
        break;
    }

    return undefined;
  };

  const handleInputChange = (
    name: keyof createSearchQueryInterface,
    value: string
  ) => {
    switch (name) {
      case 'text':
        setText(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
    setEmpty(null);
    const errorMessage = getValidationMessage(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[name] = errorMessage;
      } else {
        newErrors[name] = '';
      }
      return newErrors;
    });
  };

  return (
    <div>
      <Title text="Search Quotes" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Input
            id="text"
            name="text"
            value={text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            placeholder="Search by quote text..."
            label="Quote Text"
          />
          {errors.text && (
            <p className="text-red-500 text-base">{errors.text}</p>
          )}
        </div>
        <div>
          <Input
            id="author"
            name="author"
            value={author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="Search by author name..."
            label="Author Name"
          />
          {errors.author && (
            <p className="text-red-500 text-base">{errors.author}</p>
          )}
        </div>
        <div>
          <Input
            id="category"
            name="category"
            value={category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="Search by category..."
            label="Category"
          />
          {errors.category && (
            <p className="text-red-500 text-base">{errors.category}</p>
          )}
        </div>
        {empty && <p className="text-red-500 text-base">{empty}</p>}
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
