export const SEARCH_INPUT_CONFIG = [
  {
    id: 'text',
    placeholder: 'Search by quote text...',
    label: 'Quote Text',
    type: 'text',
    minLength: 3,
  },
  {
    id: 'author',
    placeholder: 'Search by author name...',
    label: 'Author Name',
    type: 'text',
    minLength: 2,
  },
  {
    id: 'category',
    placeholder: 'Search by category...',
    label: 'Category',
    type: 'text',
    regex: /^[a-z0-9\-]+$/,
  },
  {
    id: 'limit',
    placeholder: 'Enter limit...',
    label: 'Limit',
    type: 'number',
    min: 1,
    max: 50,
  },
];
