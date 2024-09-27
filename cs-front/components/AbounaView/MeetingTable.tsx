"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Meeting } from "@/hooks/useMeeting";
import { allMeetings } from "@/constants/meetings";

const determineStatus = (startTime: string) => {
  const now = new Date();
  const meetingTime = parseISO(startTime);
  if (meetingTime < now) return "past";
  if (
    meetingTime > now &&
    meetingTime.getTime() - now.getTime() <= 30 * 60 * 1000
  )
    return "now";
  return "upcoming";
};

export default function Component({ meetings }: { meetings: Meeting[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Meeting>[] = [
    {
      accessorKey: "status",
      header: "Status",
      accessorFn: (row) => determineStatus(row.startTime),
      cell: ({ row }) => {
        const status = determineStatus(row.original.startTime);
        return (
          <Badge
            variant={
              status === "upcoming"
                ? "outline"
                : status === "past"
                  ? "secondary"
                  : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        const status = row.getValue(columnId);
        return filterValue === "All" || status === filterValue;
      },
    },
    {
      accessorKey: "meetingType",
      header: "Type",
    },
    {
      accessorKey: "schedulingUserName",
      header: "Parish Member",
    },
    {
      accessorKey: "startTime",
      header: "Date",
      cell: ({ row }) =>
        format(parseISO(row.original.startTime), "MMM dd, yyyy"),
    },
    {
      accessorKey: "startTime",
      header: "Time",
      cell: ({ row }) => format(parseISO(row.original.startTime), "h:mm a"),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: () => "30",
    },
  ];

  const table = useReactTable({
    data: allMeetings,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Select
          value={
            (table.getColumn("status")?.getFilterValue() as string) ?? "All"
          }
          onValueChange={(value) =>
            table.getColumn("status")?.setFilterValue(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="past">Past</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="now">Now</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <TableHead key={i}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} meeting(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
