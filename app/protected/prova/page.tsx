import { ActivityTableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
import { Search } from "react-feather";
import { fetchFieldsNames, fetchProductNamesandTypes } from "@/app/actions";

import NewActivity from "@/components/ui/new-activity";
import ActivityTable from "@/components/ui/activity-table";

export default async function Page() {
  const Fields = await fetchFieldsNames();
  const Products = await fetchProductNamesandTypes();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-green-800">
              Registro Attività
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca attività..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <NewActivity fields={Fields} products={Products} />
            </div>
          </div>

          {/* Activities Table */}
          <Suspense fallback={<ActivityTableSkeleton />}>
            <ActivityTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
