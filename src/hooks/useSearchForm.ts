import { useState, useCallback } from 'react';
import { createSearchQueryInterface } from '@/types/interfaces';
import { getValidationMessage } from '@/utils/validationUtils';

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
  const [inputIsEmpty, setInputIsEmpty] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (name: keyof createSearchQueryInterface, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setInputIsEmpty(null);

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
    setInputIsEmpty(null);
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

  return {
    formData,
    validationError,
    buttonSearchClicked,
    inputIsEmpty,
    handleInputChange,
    clearForm,
    validateForm,
    setButtonSearchClicked,
  };
};
