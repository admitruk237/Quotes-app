'use client'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Title from '@/components/sections/Title'
import { API_ENDPOINTS } from '@/constants/api'
import { createSearchQueryInterface } from '@/types/interfaces'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { CATEGORY_NAME_REGEX } from '@/utils/validationUtils'

export default function CreateQuotePage() {
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

  const route = useRouter()

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

      route.push(`/quotes/${data.id}`)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred while creating the quote.'
      )
    }
  }

  return (
    <div className="p-4">
      <Title text="Create New Quote" />
      <div className="text-xl grid grid-cols-1 gap-4 mx-auto mb-6 md:w-3/4 lg:w-1/2">
        <Input
          id="text"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="Enter quote text"
          label="Quote Text"
          showError={buttonAddClicked}
          errorMessage={validationErrors.text}
        />
        <Input
          id="author"
          value={author}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAuthor(e.target.value)
          }
          placeholder="Enter author name"
          label="Author"
          showError={buttonAddClicked}
          errorMessage={validationErrors.author}
        />
        <Input
          id="categories"
          value={categories}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCategories(e.target.value)
          }
          placeholder="Enter categories (comma separated)"
          label="Categories"
          showError={buttonAddClicked}
          errorMessage={validationErrors.category}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="text-center col-span-3">
          <Button
            text="Create Quote"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
