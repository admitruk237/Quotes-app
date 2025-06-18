import React, { ChangeEvent } from 'react';

interface InputPropsType {
  id: string;
  name: string;
  value: string; // Changed from searchData to value
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string; // Added label prop
}

function Input({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
}: InputPropsType) {
  return (
    <div>
      <label
        htmlFor={id} // Fixed: now uses the id prop instead of hardcoded "text"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value} // Fixed: now uses value prop
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors duration-200"
      />
    </div>
  );
}

export default Input;
