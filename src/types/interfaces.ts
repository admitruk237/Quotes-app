export interface QuoteType {
  id: string
  text: string
  author: string
  categories: string[]
}

export interface createSearchQueryInterface {
  text: string
  author: string
  category: string
  limit?: string
}

export interface ServerError {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export interface ErrorResponse {
  errors: ServerError[]
}

export interface InputType {
  id: string
  placeholder: string
  label: string
  type: string
  regex?: RegExp
  min?: number
  max?: number
}

export interface QuoteParams {
  params: Promise<{ id: string }>
}
