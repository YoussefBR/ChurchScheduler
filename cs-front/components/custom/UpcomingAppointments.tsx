import React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data
const upcomingAppointments = [
  { id: 1, name: "John Doe", time: "10:00 AM", date: "2023-06-15" },
  { id: 2, name: "Jane Smith", time: "2:30 PM", date: "2023-06-16" },
  { id: 3, name: "Alice Johnson", time: "11:15 AM", date: "2023-06-17" },
];

export default function UpcomingAppointments() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40`}
                  alt={appointment.name}
                />
                <AvatarFallback>
                  {appointment.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {appointment.name}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <Button size="sm" className="ml-auto">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
