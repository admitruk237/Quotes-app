import { createSearchQueryInterface } from '@/types/interfaces';

export const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;
const LIMIT_REGEX = /^\d+$/;

export const getSearchValidationMessage = (
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
  if (name === 'limit' && value && !LIMIT_REGEX.test(value)) {
    return 'Limit must be a positive integer';
  }
  if (name === 'limit' && value) {
    const numValue = Number(value);
    if (numValue < 1 || numValue > 50) {
      return 'Limit must be for 1 to 50 quotes';
    }
  }
};
