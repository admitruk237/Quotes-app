import { useCreateQuote } from '@/hooks/useCreateQuote'
import { Input } from '../ui/Input'
import { ChangeEvent } from 'react'
import { Button } from '../ui/button'

export const CreateQuoteForm = () => {
  const {
    text,
    setText,
    author,
    setAuthor,
    categories,
    setCategories,
    buttonAddClicked,
    validationErrors,
    handleSubmit,
  } = useCreateQuote()

  return (
    <>
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
    </>
  )
}
