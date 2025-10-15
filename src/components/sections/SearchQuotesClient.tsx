'use client'

import { useEffect, useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { useSearchForm } from '@/hooks/useSearchForm'
import { useQuoteSearch } from '@/hooks/useQuoteSearch'
import { SEARCH_INPUT_CONFIG } from '@/config/searchConfig'
import { SearchResults } from '@/components/sections'
import { FormFields } from '@/components/form/FormFields'

export const SearchQuotesClient = () => {
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
    <>
      <FormFields
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
    </>
  )
}
