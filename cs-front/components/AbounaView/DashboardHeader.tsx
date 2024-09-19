import React from "react";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <CalendarIcon className="h-6 w-6" />
        <span className="ml-2 font-semibold">My Calendar</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Dashboard
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Appointments
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
