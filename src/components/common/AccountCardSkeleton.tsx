const AccountCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="px-4 py-3 bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-8"></div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
          <div className="h-16 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountCardSkeleton;
