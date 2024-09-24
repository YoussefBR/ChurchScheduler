import React from "react";
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
import { allMeetings } from "@/constants/meetings";

export default function DashboardTable() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [type, setType] = React.useState("all");
  console.log(type);
  return (
    <div>
      <main className="h-full grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <MeetingTableHeader setType={setType} />
          <TabsContent value={type}>
            <CustomCardContent type={type} date={date} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

type CustomCardContentProps = {
  type: string;
  date: Date;
};

const CustomCardContent = ({ type, date }: CustomCardContentProps) => {
  const filteredMeetings = allMeetings.filter((meeting) => {
    if (type === "all") {
      return true;
    }
    return meeting.status === type;
  });

  return (
    <>
      <Card>
        <CardHeaderContent date={date} />
        <CardContent>
          <MeetingTable meetings={filteredMeetings} />
        </CardContent>
        <CardFooterContent />
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

const CardFooterContent = () => {
  return (
    <>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{0}</strong> of <strong>{allMeetings.length}</strong>{" "}
          meetings
        </div>
      </CardFooter>
    </>
  );
};
