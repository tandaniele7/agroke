import DashboardMap from "@/components/ui/dashboard-map";
import Stats from "@/components/ui/stats";
import ActivitiesDash from "@/components/ui/recent-activities";
import { Suspense } from "react";
import {
  MapSkeleton,
  StatSkeleton,
  RecentActivitiesSkeleton,
} from "@/components/ui/skeletons";
import ActivityPage from "@/components/ui/activities";

export default async function Page() {
  return (
    // <Suspense fallback={<StatSkeleton />}>
    //   <Stats />
    // </Suspense>

    // <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //   <Suspense fallback={<MapSkeleton />}>
    //     <DashboardMap />
    //   </Suspense>

    //   <Suspense fallback={<RecentActivitiesSkeleton />}>
    //     <ActivitiesDash />
    //   </Suspense>
    // </div>

    
      <ActivityPage />
    
  );
}
