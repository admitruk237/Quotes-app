import Link from 'next/link';

function Header() {
  const linkClasses =
    'text-sm sm:text-lg px-2 sm:px-3 py-0.5 sm:py-1 text-gray-700 hover:text-violet-900 rounded-md font-medium transition-colors duration-200';

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-5 sm:gap-10">
          {/* Title - Left corner */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer hover:text-violet-900 transition-colors duration-200">
                Quotes App
              </h1>
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="flex space-x-8">
            <Link href="/" className={linkClasses}>
              Random
            </Link>
            <Link href="/search" className={linkClasses}>
              Search
            </Link>
          </nav>

          {/* Empty div for balance (optional) */}
          <div className="w-32"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
