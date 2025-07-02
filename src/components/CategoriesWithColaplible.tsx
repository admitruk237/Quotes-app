import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { useEffect, useState } from 'react';

interface CategoriesWithCollapsibleProps {
  categories: string[];
}

const CategoriesWithCollapsible = ({
  categories,
}: CategoriesWithCollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);

  useEffect(() => {
    const maxVisible = 8;

    if (categories.length > maxVisible) {
      setVisibleCategories(categories.slice(0, maxVisible));
      setHiddenCategories(categories.slice(maxVisible));
    } else {
      setVisibleCategories(categories);
      setHiddenCategories([]);
    }
  }, [categories]);

  return (
    <Collapsible open={isOpen} className="mt-2">
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
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
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
  );
};

export default CategoriesWithCollapsible;
