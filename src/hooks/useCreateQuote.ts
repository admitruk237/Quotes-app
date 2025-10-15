'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { API_ENDPOINTS } from '@/constants/api'
import { createSearchQueryInterface } from '@/types/interfaces'
import { CATEGORY_NAME_REGEX } from '@/utils/validationUtils'
import { useRouter } from 'next/navigation'

export const useCreateQuote = () => {
  const [text, setText] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [categories, setCategories] = useState<string>('')
  const [buttonAddClicked, setButtonAddClicked] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] =
    useState<createSearchQueryInterface>({
      text: '',
      author: '',
      category: '',
    })

  const router = useRouter()

  const isFormValid = () => {
    const errors: createSearchQueryInterface = {
      text: '',
      author: '',
      category: '',
    }

    if (text.length < 10) {
      errors.text = 'Text must be at least 10 characters long.'
    }

    if (author.length < 2 || author.length > 255) {
      errors.author = 'Author must be between 2 and 255 characters long.'
    }

    if (!categories.trim()) {
      errors.category = 'There must be at least one category.'
    }

    if (!CATEGORY_NAME_REGEX.test(categories)) {
      errors.category =
        'Category can only contain lowercase letters, numbers, and dashes'
    }

    setValidationErrors(errors)
    return !errors.text && !errors.author && !errors.category
  }

  const handleSubmit = async () => {
    setButtonAddClicked(true)
    if (!isFormValid()) return

    const payload = {
      text,
      author,
      categories: categories.split(',').map((cat) => cat.trim()),
    }

    try {
      const response = await fetch(API_ENDPOINTS.ALL_QUOTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to create quote')
      }

      const data = await response.json()
      toast.success('Quote created successfully!')

      setText('')
      setAuthor('')
      setCategories('')
      setButtonAddClicked(false)

      router.push(`/quotes/${data.id}`)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred while creating the quote.'
      )
    }
  }

  const resetForm = () => {
    setText('')
    setAuthor('')
    setCategories('')
    setButtonAddClicked(false)
    setValidationErrors({
      text: '',
      author: '',
      category: '',
    })
  }

  return {
    text,
    setText,
    author,
    setAuthor,
    categories,
    setCategories,
    buttonAddClicked,
    validationErrors,
    handleSubmit,
    resetForm,
  }
}
