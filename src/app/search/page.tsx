'use client'

import React, { useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Title from '@/components/sections/Title'
import SearchForm from '@/components/form/FormFields'
import SearchResults from '@/components/sections/SearchResults'
import { useSearchForm } from '@/hooks/useSearchForm'
import { useQuoteSearch } from '@/hooks/useQuoteSearch'
import { SEARCH_INPUT_CONFIG } from '@/config/searchConfig'

function SearchQuotesPage() {
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
  } = useSearchForm()

  const { quotes, isLoading, searchSubmitted, searchQuotes, clearResults } =
    useQuoteSearch()

  const searchExecutedRef = useRef(false)

  const handleClearInputs = () => {
    clearForm()
    clearResults()
    searchExecutedRef.current = false
  }

  useEffect(() => {
    if (shouldExecuteSearch && !searchExecutedRef.current) {
      const isValid = validateForm()

      if (isValid) {
        searchQuotes(formData)
        searchExecutedRef.current = true
      }
    }

    if (shouldExecuteSearch) {
      searchExecutedRef.current = false
    }
  }, [shouldExecuteSearch, formData, validateForm, searchQuotes])

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
        inputs={SEARCH_INPUT_CONFIG}
      />

      <SearchResults
        quotes={quotes}
        isLoading={isLoading}
        searchSubmitted={searchSubmitted}
      />
    </div>
  )
}

export default SearchQuotesPage
