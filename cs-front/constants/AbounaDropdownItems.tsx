import React from "react";
import { CalendarIcon, Home, Clock, Settings } from "lucide-react";

// Dropdown items for the Abouna dropdown
export const AbounaDropdownItems: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Schedule",
    icon: <CalendarIcon />,
  },
  {
    label: "Dashboard",
    icon: <Home />,
  },
  // {
  //   label: "Availability",
  //   icon: <Clock />,
  // },
  {
    label: "Settings",
    icon: <Settings />,
  },
];
