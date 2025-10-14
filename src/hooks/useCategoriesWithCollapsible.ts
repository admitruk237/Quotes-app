import { CategoriesWithCollapsibleProps } from '@/types/interfaces'
import { useMemo } from 'react'

export const useCategoriesWithCollapsible = ({
  categories,
}: CategoriesWithCollapsibleProps) => {
  const maxVisible = 8

  const visibleCategories = useMemo(
    () => categories.slice(0, maxVisible),
    [categories]
  )

  const hiddenCategories = useMemo(
    () => categories.slice(maxVisible),
    [categories]
  )

  return { visibleCategories, hiddenCategories }
}
