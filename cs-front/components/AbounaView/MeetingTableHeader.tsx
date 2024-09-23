import React from "react";
import { format, setDate } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterMenu from "@/components/custom/FilterMenu";
import { allMeetings } from "@/constants/meetings";

export default function MeetingTableHeader() {
  const [meetings, setMeetings] = React.useState(allMeetings);
  const [date, setDate] = React.useState<Date>(new Date());

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const filteredMeetings = allMeetings.filter(
        (meeting) => meeting.date === formattedDate
      );
      setMeetings(filteredMeetings);
    } else {
      setMeetings(allMeetings);
    }
  };

  return (
    <div className="mb-4 mt-4">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="canceled" className="hidden sm:flex">
            Canceled
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[240px]
                        justify-start text-left font-normal ${
                          !date && "text-muted-foreground"
                        }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={() => handleDateSelect(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FilterMenu />
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Meeting
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
