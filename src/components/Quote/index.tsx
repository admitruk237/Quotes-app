import Link from 'next/link'
import { CategoriesWithCollapsible } from '../CategoriesWithCollapsible'

type Props = {
  quote: {
    text: string
    author: string
    categories: Array<string>
    id: string
  }
}

export const Quote = ({ quote }: Props) => {
  return (
    <div className="relative">
      <Link href={`/quotes/${quote.id}`}>
        <div className="bg-gray-100 p-4 shadow-md rounded-lg cursor-pointer mb-6 transition-all duration-300 hover:bg-gray-300 hover:scale-110">
          <p className="mb-4 text-lg italic">
            "
            {quote.text.length < 200
              ? quote.text
              : `${quote.text.slice(0, 199)}...`}
          </p>
          <p className="text-right mb-10 font-semibold">— {quote.author}</p>
          <CategoriesWithCollapsible categories={quote.categories} />
        </div>
      </Link>
    </div>
  )
}
