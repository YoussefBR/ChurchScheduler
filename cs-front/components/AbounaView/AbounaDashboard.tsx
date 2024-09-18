"use client";

import Link from "next/link";
import DashboardHeader from "./DashboardHeader";
import UpcomingAppointments from "@/components/custom/UpcomingAppointments";
import UpdateAvailability from "@/components/custom/UpdateAvailability";

export default function AbounaDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 p-4 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <UpdateAvailability />
          <UpcomingAppointments />
        </div>
      </main>
    </div>
  );
}
