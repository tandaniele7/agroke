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

export function FieldCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-gray-200 h-7 w-48 rounded"></div>
          <div className="flex gap-2">
            <div className="bg-gray-200 h-8 w-8 rounded"></div>
            <div className="bg-gray-200 h-8 w-8 rounded"></div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 h-4 w-4 rounded mr-1"></div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
        </div>

        {/* Area and Crop Type */}
        <div className="flex items-center mb-2">
          <div className="bg-gray-200 h-4 w-24 rounded"></div>
          <div className="mx-2 bg-gray-200 h-4 w-2 rounded"></div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <div className="bg-gray-200 h-4 w-4 rounded mr-1"></div>
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
              </div>
              <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand Button */}
      <div className="border-t border-gray-100">
        <div className="w-full bg-gray-50 py-3 flex items-center justify-center gap-2">
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
          <div className="bg-gray-200 h-4 w-4 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function ActivityTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead className="bg-gray-50">
          <tr>
            {[...Array(6)].map((_, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left"
              >
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {/* Date */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </td>
              {/* Type */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
              </td>
              {/* Field */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-32 rounded"></div>
              </td>
              {/* Product */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-28 rounded"></div>
              </td>
              {/* Quantity */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-gray-200 h-4 w-16 rounded"></div>
              </td>
              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center space-x-2">
                  <div className="bg-gray-200 h-8 w-8 rounded"></div>
                  <div className="bg-gray-200 h-8 w-8 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}