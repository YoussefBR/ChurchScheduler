import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 10;

export default function MeetingTable({ meetings }: { meetings: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "all";

  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const filtered = meetings.filter((meeting) => {
      if (status === "all") return true;
      return determineStatus(meeting) === status;
    });
    setFilteredMeetings(filtered);
  }, [meetings, status]);

  const totalPages =
    filteredMeetings.length === 0
      ? 1
      : Math.ceil(filteredMeetings.length / ITEMS_PER_PAGE);
  const paginatedMeetings = filteredMeetings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", newStatus);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="past">Past</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="now">Now</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
          {paginatedMeetings.map((meeting: Meeting) => (
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
      <div className="flex justify-between items-center">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
