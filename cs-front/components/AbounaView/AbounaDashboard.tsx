"use client";

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import MobileSidebar from "../custom/MobileSidebar"
import { AbounaDropdownItems } from "@/constants/AbounaDropdownItems"
import DashboardTable from "./DashboardTable"
import AbounaStats from "./AbounaStats"
import QuickSchedule from "../custom/QuickSchedule"
import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import { generateSampleEvents, Event } from "./SampleEvents";
import { useState } from "react";
import { TestCalendar } from "./TestCalendar";

export function AbounaDashboard() {

  const [events, setEvents] = useState<Event[]>(generateSampleEvents());
  const localizer = momentLocalizer(moment)

  return (
    <div className="flex min-h-screen w-full flex-col bg-background ">
      <div className="flex h-screen flex-col  sm:gap-4 sm:py-4 sm:pl-14 ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background pr-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:pr-6">
          <MobileSidebar items={AbounaDropdownItems} />
          <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meetings..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        {/* <div className="grid grid-cols-9 h-full w-full">
          <div className="col-span-3 ">
            <AbounaStats />
          </div>

          <div className="col-span-6">
            <DashboardTable />
            <QuickSchedule />
          </div>
        </div> */}
        {/* <Calendar 
          localizer={localizer}
          defaultView="month"
          events={[]}
          startAccessor="start"
          endAccessor="end"
        /> */}
        <TestCalendar />
      </div>
    </div>
  );
}
