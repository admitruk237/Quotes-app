import Link from 'next/link';
import CategoriesWithCollapsible from './CategoriesWithColaplible';

type QuotesPropsType = {
  quote: {
    text: string;
    author: string;
    categories: Array<string>;
    id: string;
  };
};

function Quotes({ quote }: QuotesPropsType) {
  return (
    <div className="relative">
      <Link href={`/quotes/${quote.id}`}>
        <div
          className="bg-gray-100 p-4 shadow-md rounded-lg cursor-pointer mb-6 transition-all duration-300"
          style={{
            transform: 'translateY(0) scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.backgroundColor = '#d1d5db';
            e.currentTarget.style.boxShadow =
              '0 10px 15px -3px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.boxShadow =
              '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
        >
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
  );
}

export default Quotes;
