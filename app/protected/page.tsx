import Stats from "@/components/ui/stats";
import DashboardMap from "@/components/ui/dashboard-map";
import RecentActivities from "@/components/ui/recent-activities";
import { Suspense } from "react";
import {
  StatSkeleton,
  MapSkeleton,
  RecentActivitiesSkeleton,
  WheatherSkeletonDashboard,
  NotificationSkeleton,
} from "@/components/ui/skeletons";
import WheatherWidget from "@/components/ui/wheather-dash";
import NotificationWidget from "@/components/ui/notification-dash";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          {/* Dashboard header */}
          <div className="flex justify-start items-center">
            <h2 className="text-2xl font-bold text-green-800">
              Panoramica Aziendale
            </h2>
          </div>

          {/* Quick stats */}
          <Suspense fallback={<StatSkeleton />}>
            <Stats />
          </Suspense>

          {/* Map and activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Suspense fallback={<MapSkeleton />}>
              <DashboardMap />
            </Suspense>
            <Suspense fallback={<RecentActivitiesSkeleton />}>
              <RecentActivities />
            </Suspense>
          </div>

          {/* Notifications and weather */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Suspense fallback={<NotificationSkeleton />}>
              <NotificationWidget />
            </Suspense>
            <Suspense fallback={<WheatherSkeletonDashboard />}>
              <WheatherWidget />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
