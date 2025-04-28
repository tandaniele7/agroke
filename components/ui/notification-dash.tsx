import { fetchNotifications } from "@/app/actions";
import { ChevronRight, AlertTriangle } from "react-feather";

export default async function NotificationWidget() {
  const notifications = await fetchNotifications();

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Avvisi e Scadenze</h3>
        <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
          Visualizza tutto <ChevronRight size={16} />
        </button>
      </div>

      {notifications.length === 0 && (
        <div className="flex p-3 items-center rounded-lg h-full lg:-translate-y-10 -translate-y-4">
          <p className="text-gray-500 mx-auto">Nessun avviso o scadenza.</p>
        </div>
      )}
      {notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((notification, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                notification.type === "warning"
                  ? "bg-amber-50 border-l-4 border-amber-500"
                  : "bg-red-50 border-l-4 border-red-500"
              }`}
            >
              <div className="flex justify-between">
                <div className="flex">
                  <div
                    className={`mr-3 mt-1 ${
                      notification.type === "warning"
                        ? "text-amber-500"
                        : "text-red-500"
                    }`}
                  >
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-gray-800">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.date).toLocaleDateString("it-IT")}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
