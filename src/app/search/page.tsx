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
  const [buttonSearchClicked, setButtonSearchClicked] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [inputIsEmpty, setInputIsEmpty] = useState<null | string>(null);
  const [errors, setErrors] = useState<createSearchQueryInterface>({
    text: '',
    author: '',
    category: '',
  });

  const handleSearch = async () => {
    setButtonSearchClicked(true);
    if (text.trim() === '' && author.trim() === '' && category.trim() === '') {
      return setInputIsEmpty('Input fields can not be empty'); // Prevent empty search
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

  const handleClearInputs = () => {
    setText('');
    setAuthor('');
    setCategory('');
    setButtonSearchClicked(false);
    setSearchSubmitted(false);
    setQuotes([]);
  };

  const getValidationMessage = (
    name: keyof createSearchQueryInterface,
    value: string
  ): string | undefined => {
    if (name === 'text' && value && value.length < 3) {
      return 'Text must be at least 3 characters long';
    }

    if (name === 'author' && value && value.length < 2) {
      return 'Author must be at least 2 characters long';
    }

    if (name === 'category' && value && !CATEGORY_NAME_REGEX.test(value)) {
      return 'Category can only contain lowercase letters, numbers, and dashes';
    }

    return undefined;
  };

  const handleInputChange = (
    name: keyof createSearchQueryInterface,
    value: string
  ) => {
    if (name === 'text') setText(value);
    if (name === 'author') setAuthor(value);
    if (name === 'category') setCategory(value);

    setInputIsEmpty(null);

    const errorMessage = getValidationMessage(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      newErrors[name] = errorMessage || '';
      return newErrors;
    });
  };

  return (
    <div>
      <Title text="Search Quotes" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 relative">
        <div className="mb-0">
          <Input
            id="text"
            name="text"
            value={text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            placeholder="Search by quote text..."
            label="Quote Text"
          />
          {buttonSearchClicked && errors.text && (
            <p className="text-red-500 text-base">{errors.text}</p>
          )}
        </div>
        <div className="mb-0">
          <Input
            id="author"
            name="author"
            value={author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="Search by author name..."
            label="Author Name"
          />
          {buttonSearchClicked && errors.author && (
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
          {buttonSearchClicked && errors.category && (
            <p className="text-red-500 text-base">{errors.category}</p>
          )}
        </div>
        {inputIsEmpty && (
          <p className="text-red-500 text-base absolute top-20 left-1.5">
            {inputIsEmpty}
          </p>
        )}
      </div>

      <div className="flex gap-4 flex-row justify-center md:gap-10 flex-wrap">
        <Button onClick={handleSearch} text="Search Quotes" />
        <Button
          onClick={handleClearInputs}
          text="Clear Inputs Field"
          variant="secondary"
        />
      </div>

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
