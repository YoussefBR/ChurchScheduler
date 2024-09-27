"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import MobileSidebar from "../custom/MobileSidebar";
import { AbounaDropdownItems } from "@/constants/AbounaDropdownItems";
import DashboardTable from "./DashboardTable";
import AbounaStats from "./AbounaStats";
import QuickSchedule from "../custom/QuickSchedule";
import useMeetingStore from "@/hooks/useMeeting";

export function AbounaDashboard() {
  const { meetings, fetchMeetings } = useMeetingStore();
  console.log(meetings);
  return (
    <div className="flex min-h-screen w-full flex-col bg-background ">
      <div className="flex h-screen flex-col  sm:gap-4 sm:py-4 sm:pl-14 ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background pr-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:pr-6">
          <MobileSidebar items={AbounaDropdownItems} />
          <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        </header>
        <div className="grid grid-cols-9 h-full w-full">
          <div className="col-span-3 ">
            <AbounaStats />
          </div>

          <div className="col-span-6">
            <DashboardTable />
            <QuickSchedule />
          </div>
        </div>
      </div>
    </div>
  );
}
