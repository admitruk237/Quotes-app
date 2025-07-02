import { useState, useCallback, useEffect } from 'react';
import { createSearchQueryInterface } from '@/types/interfaces';
import { getValidationMessage } from '@/utils/validationUtils';
import { useSearchParams } from 'next/navigation';

export const useSearchForm = () => {
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    category: '',
    limit: '',
  });

  const [validationError, setValidationError] =
    useState<createSearchQueryInterface>({
      text: '',
      author: '',
      category: '',
      limit: '',
    });

  const [buttonSearchClicked, setButtonSearchClicked] = useState(false);
  const [shouldExecuteSearch, setShouldExecuteSearch] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState<string | null>(null);

  let searchParams = useSearchParams();

  const text = searchParams.get('text') || '';
  const author = searchParams.get('author') || '';
  const category = searchParams.get('category') || '';
  const limit = searchParams.get('limit') || '';

  const validateAllFields = useCallback((data: createSearchQueryInterface) => {
    const errors: createSearchQueryInterface = {
      text: '',
      author: '',
      category: '',
      limit: '',
    };

    Object.keys(data).forEach((key) => {
      const fieldName = key as keyof createSearchQueryInterface;
      const errorMessage = getValidationMessage(fieldName, data[fieldName]);
      errors[fieldName] = errorMessage || '';
    });

    return errors;
  }, []);

  useEffect(() => {
    if (text || author || category || limit) {
      const newFormData = { text, author, category, limit };
      setFormData(newFormData);
      setButtonSearchClicked(true);
      setShouldExecuteSearch(true);

      const errors = validateAllFields(newFormData);
      setValidationError(errors);
    }
  }, [text, author, category, limit, validateAllFields]);

  const handleInputChange = useCallback(
    (name: keyof createSearchQueryInterface, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setInputIsEmpty(null);
      setShouldExecuteSearch(false);

      const errorMessage = getValidationMessage(name, value);
      setValidationError((prev) => ({
        ...prev,
        [name]: errorMessage || '',
      }));
    },
    []
  );

  const clearForm = useCallback(() => {
    setFormData({ text: '', author: '', category: '', limit: '' });
    setValidationError({ text: '', author: '', category: '', limit: '' });
    setButtonSearchClicked(false);
    setShouldExecuteSearch(false);
    setInputIsEmpty(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const validateForm = useCallback(() => {
    const { text, author, category } = formData;

    if (text.trim() === '' && author.trim() === '' && category.trim() === '') {
      setInputIsEmpty('Input fields can not be empty');
      return false;
    }

    const hasErrors = Object.values(validationError).some(
      (error) => error !== ''
    );
    return !hasErrors;
  }, [formData, validationError]);

  const handleSearchButtonClick = useCallback(() => {
    setButtonSearchClicked(true);

    if (validateForm()) {
      setShouldExecuteSearch(true);
    }
  }, [validateForm]);

  return {
    formData,
    validationError,
    buttonSearchClicked,
    shouldExecuteSearch,
    inputIsEmpty,
    handleInputChange,
    clearForm,
    validateForm,
    setButtonSearchClicked,
    handleSearchButtonClick,
  };
};
