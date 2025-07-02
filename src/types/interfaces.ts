export interface Quote {
  id: string;
  text: string;
  author: string;
  categories: string[];
}

export interface createSearchQueryInterface {
  text: string;
  author: string;
  category: string;
  limit: string;
}

export interface ServerError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface ErrorResponse {
  errors: ServerError[];
}
