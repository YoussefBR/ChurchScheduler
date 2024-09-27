import React, { useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MeetingTableHeader from "@/components/AbounaView/MeetingTableHeader";
import MeetingTable from "@/components/AbounaView/MeetingTable";

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

const CustomCardContent = ({ date, meetings }: CustomCardContentProps) => {
  return (
    <>
      <Card>
        <CardHeaderContent date={date} />
        <CardContent>
          <MeetingTable meetings={meetings} />
        </CardContent>
      </Card>
    </>
  );
};

const CardHeaderContent = (children: any) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Scheduled Meetings</CardTitle>
        <CardDescription>Your recent and upcoming meetings.</CardDescription>
      </CardHeader>
    </>
  );
};
