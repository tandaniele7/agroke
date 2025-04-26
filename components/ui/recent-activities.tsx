import Link from "next/link";
import { ChevronRight } from "react-feather";
import { fetchActivitiesDash } from "@/app/actions";
import { activityType } from "@/lib/definitions";

export default async function RecentActivities() {
  const activities = await fetchActivitiesDash();

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Attività Recenti</h3>
        <Link
          className="text-green-600 hover:text-green-800 text-sm flex items-center"
          href={"/protected/activity"}
        >
          Visualizza tutto <ChevronRight size={16} />
        </Link>
      </div>
      <div className="space-y-4">
        {activities.map((item, idx) => (
          <div key={idx} className="border-l-4 border-green-500 pl-3 py-2">
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {activityType.find((t) => t.id === item.activityType)?.icon || "🔧"}
              </span>
              <div>
                <p className="font-medium text-gray-800">{item.activityType}</p>
                <p className="text-sm text-gray-600">
                  {item.fieldName} -{" "}
                  {new Date(item.activityDate).toLocaleDateString("it-IT")}
                </p>
              </div>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nessuna attività registrata</p>
          </div>
        )}
      </div>
    </div>
  );
}
