"use client";

import SalesOverview from "../components/SalesOverview";
import UserActivity from "../components/UserActivity";
import TopCrops from "../components/TopCrops";
import StatCards from "../components/StatCards";
import DashboardNotification from "../components/DashboardNotification";
import DashboardApproval from "../components/DashboardApproval";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1 text-xl font-semibold">
          Dashboard Overview
        </h2>
        <p className="text-gray-500">
          Welcome back! Here&#39;s what&#39;s happening with FarmConnect today.
        </p>
      </div>

      {/* Stats Cards */}
      <StatCards />
      {/* Charts Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <SalesOverview />

        {/* User Activity */}
        <UserActivity />
      </div>

      {/* Top Crops and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Crops */}
        <TopCrops />

        {/* Notifications */}
        <DashboardNotification />
      </div>

      {/* Pending Approvals */}
      <DashboardApproval />
    </div>
  );
}
