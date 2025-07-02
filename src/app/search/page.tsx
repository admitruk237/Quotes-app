'use client';

import React, { useEffect, useRef } from 'react';
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
    shouldExecuteSearch,
    inputIsEmpty,
    handleInputChange,
    clearForm,
    validateForm,
    handleSearchButtonClick,
  } = useSearchForm();

  const { quotes, isLoading, searchSubmitted, searchQuotes, clearResults } =
    useQuoteSearch();

  const searchExecutedRef = useRef(false);

  const handleClearInputs = () => {
    clearForm();
    clearResults();
    searchExecutedRef.current = false;
  };

  useEffect(() => {
    if (shouldExecuteSearch && !searchExecutedRef.current) {
      const isValid = validateForm();

      if (isValid) {
        searchQuotes(formData);
        searchExecutedRef.current = true;
      }
    }

    if (shouldExecuteSearch) {
      searchExecutedRef.current = false;
    }
  }, [shouldExecuteSearch, formData, validateForm, searchQuotes]);

  return (
    <div>
      <Title text="Search Quotes" />

      <SearchForm
        formData={formData}
        validationError={validationError}
        buttonSearchClicked={buttonSearchClicked}
        inputIsEmpty={inputIsEmpty}
        onInputChange={handleInputChange}
        onSearch={handleSearchButtonClick}
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
