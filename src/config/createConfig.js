export const CREATE_INPUT_CONFIG = [
  {
    id: 'text',
    placeholder: 'Enter quote text',
    label: 'Quote Text',
    type: 'text',
    minLength: 3,
  },
  {
    id: 'author',
    placeholder: 'Enter author name',
    label: 'Author Name',
    type: 'text',
    minLength: 2,
  },
  {
    id: 'category',
    placeholder: 'Enter categories (comma separated)',
    label: 'Categories',
    type: 'text',
    regex: /^[a-z0-9\-]+$/,
  },
]
