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

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <MeetingTableHeader />
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Meetings</CardTitle>
                <CardDescription>
                  {date
                    ? `Meetings for ${format(date, "MMMM d, yyyy")}`
                    : "Manage your upcoming and past meetings."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MeetingTable meetings={allMeetings} />
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{0}</strong> of{" "}
                  <strong>{allMeetings.length}</strong> meetings
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
