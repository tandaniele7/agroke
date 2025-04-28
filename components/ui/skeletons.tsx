export function StatSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-3 md:p-6 flex items-center animate-pulse"
        >
          <div className="bg-gray-200 w-12 h-12 rounded-lg mr-4"></div>
          <div className="flex flex-col">
            <div className="bg-gray-200 w-24 h-4 mb-2 rounded"></div>
            <div className="bg-gray-200 w-16 h-8 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="bg-gray-100 rounded-lg h-80 relative overflow-hidden animate-pulse">
      <div className="bg-gray-200 w-full h-full"></div>
    </div>
  );
}

export function RecentActivitiesSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 w-1/2 h-6 rounded"></div>
        <div className="bg-gray-200 w-1/4 h-6 rounded"></div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-l-4 border-gray-300 pl-3 py-2 flex items-center"
          >
            <div className="bg-gray-200 w-8 h-8 rounded mr-2"></div>
            <div className="flex flex-col">
              <div className="bg-gray-200 w-full h-4 mb-1 rounded"></div>
              <div className="bg-gray-200 w-full h-4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityPageSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 w-1/2 h-6 rounded"></div>
        <div className="bg-gray-200 w-1/4 h-6 rounded"></div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-l-4 border-gray-300 pl-3 py-2 flex items-center"
          >
            <div className="bg-gray-200 w-8 h-8 rounded mr-2"></div>
            <div className="flex flex-col">
              <div className="bg-gray-200 w-full h-4 mb-1 rounded"></div>
              <div className="bg-gray-200 w-full h-4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WheatherSkeletonDashboard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 w-1/2 h-6 rounded"></div>
        <div className="bg-gray-200 w-1/4 h-6 rounded"></div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-l-4 border-gray-300 pl-3 py-2 flex items-center"
          >
            <div className="bg-gray-200 w-8 h-8 rounded mr-2"></div>
            <div className="flex flex-col">
              <div className="bg-gray-200 w-full h-4 mb-1 rounded"></div>
              <div className="bg-gray-200 w-full h-4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 w-1/2 h-6 rounded"></div>
        <div className="bg-gray-200 w-1/4 h-6 rounded"></div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-l-4 border-gray-300 pl-3 py-2 flex items-center"
          >
            <div className="bg-gray-200 w-8 h-8 rounded mr-2"></div>
            <div className="flex flex-col">
              <div className="bg-gray-200 w-full h-4 mb-1 rounded"></div>
              <div className="bg-gray-200 w-full h-4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
