function QuoteDisplay({ quote }: { quote: any }) {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-6 text-violet-900 dark:text-violet-300">
        {quote.text}
      </h2>
      <p className="text-2xl text-center text-gray-600 dark:text-gray-300 mb-4">
        — {quote.author ? quote.author : 'Unknown Author'}
      </p>
      <div className="flex justify-center flex-wrap gap-3 mt-10">
        {quote.categories.map((category: string) => {
          return (
            <span
              key={category}
              className="text-base bg-violet-200 text-violet-900 py-2 px-4 rounded-lg dark:bg-violet-700 dark:text-violet-200 hover:bg-violet-300 dark:hover:bg-violet-600 transition-colors duration-300 cursor-pointer"
            >
              {category}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default QuoteDisplay;
