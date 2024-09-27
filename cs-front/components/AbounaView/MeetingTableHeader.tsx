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

type MeetingTableHeaderProps = {
  setType: (type: string) => void;
  setMeetings: (
    meetings: {
      meetingId: string;
      meetingType: string;
      abounaId: string;
      schedulingUserName: string;
      schedulingUserEmail: string;
      startTime: string;
      endTime: string;
    }[]
  ) => void;
};

export default function MeetingTableHeader({
  setType,
  setMeetings,
}: MeetingTableHeaderProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const filteredMeetings = allMeetings.filter(
        (meeting) => format(meeting.startTime, "yyyy-MM-dd") === formattedDate
      );
      setMeetings(filteredMeetings);
    } else {
      setMeetings(allMeetings);
    }
  };

  return (
    <div className="mb-4 mt-4">
      <div className="flex items-center">
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
                disabled={{ before: new Date() }}
                selected={date}
                onSelect={(e) => {
                  handleDateSelect(e!);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
