import React, { ChangeEvent } from 'react'

type Props = {
  id: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  label: string
  showError: boolean
  errorMessage: string
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  label,
  showError,
  errorMessage,
}: Props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors duration-200"
      />
      {showError && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  )
}
