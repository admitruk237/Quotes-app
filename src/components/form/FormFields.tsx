import React, { ChangeEvent } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'

import { createSearchQueryInterface, InputType } from '@/types/interfaces'

type Props = {
  formData: any
  validationError: createSearchQueryInterface
  buttonSearchClicked: boolean
  inputIsEmpty: string | null
  onInputChange: (name: keyof createSearchQueryInterface, value: string) => void
  onSearch: () => void
  onClear?: () => void
  inputs: InputType[]
}

const FormFields = ({
  formData,
  validationError,
  buttonSearchClicked,
  inputIsEmpty,
  onInputChange,
  onSearch,
  onClear,
  inputs,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-10 relative md:grid-cols-[1fr_1fr_1fr_0.5fr]">
        {inputs.map((config) => (
          <Input
            key={config.id}
            id={config.id}
            value={formData[config.id]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onInputChange(
                config.id as keyof createSearchQueryInterface,
                e.target.value
              )
            }
            placeholder={config.placeholder}
            label={config.label}
            showError={buttonSearchClicked}
            errorMessage={
              validationError[config.id as keyof createSearchQueryInterface] ||
              ''
            }
          />
        ))}

        {inputIsEmpty && (
          <p className="text-red-500 text-sm absolute bottom-[-20px] left-0">
            {inputIsEmpty}
          </p>
        )}
      </div>

      <div className="flex gap-4 flex-row justify-center md:gap-10 flex-wrap">
        <Button
          onClick={onSearch}
          text="Search Quotes"
        />
        <Button
          onClick={onClear}
          text="Clear Inputs Field"
          variant="secondary"
        />
      </div>
    </>
  )
}

export default FormFields
