const InterviewSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black text-black dark:text-white space-y-8">
      {/* Title Skeleton */}
      <div className="h-10 w-1/3 bg-gray-300 dark:bg-gray-800 rounded-lg animate-pulse"></div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-3 gap-6 w-3/4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="h-24 bg-gray-300 dark:bg-gray-800 rounded-lg animate-pulse"
            ></div>
          ))}
      </div>

      {/* Performance Trend Skeleton */}
      <div className="w-3/4 space-y-4">
        <div className="h-8 w-1/4 bg-gray-300 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-40 bg-gray-300 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default InterviewSkeleton;
