import { createSearchQueryInterface } from '@/types/interfaces';

export const createSearchQuery = ({
  text,
  author,
  category,
  limit,
}: createSearchQueryInterface): string => {
  const params: string[] = [];

  if (text) params.push(`text=${encodeURIComponent(text)}`);
  if (author) params.push(`author=${encodeURIComponent(author)}`);
  if (category) params.push(`category=${encodeURIComponent(category)}`);
  params.push(`limit=${limit || '10'}`);

  return params.join('&');
};
