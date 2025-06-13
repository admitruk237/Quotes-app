export interface Quote {
  id: string;
  text: string;
  author: string;
  categories: string[]; // Assuming categories could be an array of strings
}

export interface createSearchQueryInterface {
  text: string;
  author: string;
  category: string;
  empty?: string;
}
