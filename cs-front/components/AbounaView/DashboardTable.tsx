import React, { useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MeetingTableHeader from "@/components/AbounaView/MeetingTableHeader";
import MeetingTable from "@/components/AbounaView/MeetingTable";
import { format } from "date-fns";

import useMeetingStore, { Meeting } from "@/hooks/useMeeting";

export default function DashboardTable() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [type, setType] = React.useState("all");

  const { meetings, fetchMeetings } = useMeetingStore();
  const [allMeetings, setAllMeetings] = React.useState<Meeting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMeetings();
    };

    fetchData();
    setAllMeetings(meetings);
  }, [fetchMeetings, meetings]);

  return (
    <div>
      <main className="h-full grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <MeetingTableHeader setType={setType} setMeetings={setAllMeetings} />
          <TabsContent value={type}>
            <CustomCardContent type={type} date={date} meetings={meetings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

type CustomCardContentProps = {
  type: string;
  date: Date;
  meetings: Meeting[];
};

const CustomCardContent = ({
  type,
  date,
  meetings,
}: CustomCardContentProps) => {
  const filteredMeetings = meetings.filter((meeting) => {
    return true;
  });

  return (
    <>
      <Card>
        <CardHeaderContent date={date} />
        <CardContent>
          <MeetingTable meetings={filteredMeetings} />
        </CardContent>
        <CardFooterContent length={filteredMeetings?.length} />
      </Card>
    </>
  );
};

const CardHeaderContent = (children: any) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Scheduled Meetings</CardTitle>
        <CardDescription>
          {children.date
            ? `Meetings for ${format(children.date, "MMMM d, yyyy")}`
            : "Manage your upcoming and past meetings."}
        </CardDescription>
      </CardHeader>
    </>
  );
};

const CardFooterContent = ({ length }: { length: number }) => {
  return (
    <>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{0}</strong> of <strong>{length ? length : 0}</strong>{" "}
          meetings
        </div>
      </CardFooter>
    </>
  );
};
