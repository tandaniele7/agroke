import ActivityPage from "@/components/ui/activities";
import { ActivityPageSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";
export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <Suspense fallback={<ActivityPageSkeleton />}>
          <ActivityPage />
        </Suspense>
      </div>
    </div>
  );
}
