'use client';

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Title from '@/components/Title';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { useSearchForm } from '@/hooks/useSearchForm';
import { useQuoteSearch } from '@/hooks/useQuoteSearch';

function Search() {
  const {
    formData,
    validationError,
    buttonSearchClicked,
    inputIsEmpty,
    handleInputChange,
    clearForm,
    validateForm,
    setButtonSearchClicked,
  } = useSearchForm();

  const { quotes, isLoading, searchSubmitted, searchQuotes, clearResults } =
    useQuoteSearch();

  const handleSearch = async () => {
    setButtonSearchClicked(true);

    if (!validateForm()) {
      return;
    }

    await searchQuotes(formData);
  };

  const handleClearInputs = () => {
    clearForm();
    clearResults();
  };

  return (
    <div>
      <Title text="Search Quotes" />

      <SearchForm
        formData={formData}
        validationError={validationError}
        buttonSearchClicked={buttonSearchClicked}
        inputIsEmpty={inputIsEmpty}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onClear={handleClearInputs}
      />

      <SearchResults
        quotes={quotes}
        isLoading={isLoading}
        searchSubmitted={searchSubmitted}
      />
    </div>
  );
}

export default Search;
