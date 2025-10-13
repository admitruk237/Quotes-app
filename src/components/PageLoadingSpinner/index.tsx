const PageLoadingSpinner = ({
  message = 'Loading...',
  headerHeight = '80px',
}) => {
  return (
    <div
      className="fixed left-0 right-0 bottom-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center"
      style={{ top: headerHeight }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

          <div className="text-center">
            <p className="text-gray-600 font-medium text-lg animate-pulse">
              {message}
            </p>
            <div className="flex justify-center space-x-1 mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoadingSpinner
