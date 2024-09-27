import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Meeting } from "@/hooks/useMeeting";
import { format, parseISO } from "date-fns";

export default function MeetingTable({ meetings }: { meetings: any[] }) {
  const determineStatus = (date: Meeting) => {
    const now = new Date();
    const meetingStart = new Date(date.startTime);
    const meetingEnd = new Date(date.endTime);

    if (meetingStart > now) {
      return "upcoming";
    } else if (meetingStart < now && meetingEnd < now) {
      return "past";
    } else {
      return "ongoing";
    }
  };

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parish Member</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Time</TableHead>
            <TableHead className="hidden md:table-cell">Duration</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting: Meeting) => (
            <TableRow key={meeting.meetingId}>
              <TableCell>
                <Badge
                  variant={
                    determineStatus(meeting) === "upcoming"
                      ? "outline"
                      : determineStatus(meeting) === "past"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {determineStatus(meeting)}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {meeting.meetingType}
              </TableCell>
              <TableCell>{meeting.schedulingUserName}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(parseISO(meeting.startTime), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {format(parseISO(meeting.startTime), "h:mm a")}
              </TableCell>
              <TableCell className="hidden md:table-cell">{30}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem>Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
