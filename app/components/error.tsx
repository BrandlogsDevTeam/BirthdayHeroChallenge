interface ErrorProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage = ({ message, onDismiss }: ErrorProps) => {
  if (!message) return null;

  return (
    <div className="relative mb-4 p-3 rounded-lg border border-red-300 bg-red-50 text-red-700">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {/* Error Icon */}
          <svg
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex text-red-500 hover:bg-red-100 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
