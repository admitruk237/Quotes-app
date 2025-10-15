'use client'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'

import { CategoriesWithCollapsibleProps } from '@/types/interfaces'
import { useCategoriesWithCollapsible } from '@/hooks/useCategoriesWithCollapsible'

export const CategoriesWithCollapsible = ({
  categories,
}: CategoriesWithCollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { visibleCategories, hiddenCategories } = useCategoriesWithCollapsible({
    categories,
  })

  return (
    <Collapsible
      open={isOpen}
      className="mt-2"
    >
      <div className="flex flex-wrap">
        {visibleCategories.map((category) => (
          <span
            key={category}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>

      <CollapsibleContent>
        <div className="flex flex-wrap">
          {hiddenCategories.map((category) => (
            <span
              key={category}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
            >
              {category}
            </span>
          ))}
        </div>
      </CollapsibleContent>

      {hiddenCategories.length > 0 && (
        <CollapsibleTrigger
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors cursor-pointer"
        >
          <span>
            {isOpen ? 'Show less' : `Show ${hiddenCategories.length} more`}
          </span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
      )}
    </Collapsible>
  )
}
