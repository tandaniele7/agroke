import { fetchActivities } from "@/app/actions";
import { activityType } from "@/lib/definitions";
import TableRow from "./activity-tablerow";

export default async function ActivityTable() {
  const activities = await fetchActivities();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tipo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Terreno
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Prodotto
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantità
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((att, idx) => (
              <TableRow key={idx} index={idx} activity={att} view="desktop" />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Shown only on mobile */}
      <div className="md:hidden">
        {activities.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="p-4 space-y-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">
                      {activityType.find((t) => t.id === activity.activity_type)
                        ?.icon || "🔧"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {
                        activityType.find(
                          (t) => t.id === activity.activity_type
                        )?.name
                      }
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.activity_date).toLocaleDateString(
                      "it-IT"
                    )}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-20">Terreno:</span>
                    <span className="text-gray-900">{activity.field_name}</span>
                  </div>
                  {activity.product_name && (
                    <>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 w-20">Prodotto:</span>
                        <span className="text-gray-900">
                          {activity.product_name}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 w-20">Quantità:</span>
                        <span className="text-gray-900">
                          {activity.product_quantity}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Nessuna attività registrata
          </div>
        )}
      </div>
    </div>
  );
}
