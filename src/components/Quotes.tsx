type QuotesPropsType = {
  quote: { text: string; author: string; categories: Array<string> };
};
function Quotes({ quote }: QuotesPropsType) {
  return (
    <div className="bg-gray-100 p-4 shadow-md rounded-lg">
      <p className="mb-4 text-lg italic">"{quote.text}"</p>
      <p className="text-right mb-10 font-semibold">— {quote.author}</p>
      <div className="flex flex-wrap mt-2">
        {quote.categories.map((category) => (
          <span
            key={category}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Quotes;
