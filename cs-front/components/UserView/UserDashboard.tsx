"use client";
import React, { useEffect, useState } from "react";
import { UserCalendar } from "./UserCalendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import useMeetingStore, { Meeting } from "@/hooks/useMeeting";

const priestName = "Fr. Danial Zaki";

export const UserDashboard: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
  };
  // const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { fetchMeetings, meetings } = useMeetingStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchMeetings();
    };

    fetchData();
  }, [fetchMeetings]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="h-full p-4 lg:p-6">
        <div className="flex flex-col gap-4 sm:grid  sm:grid-cols-6">
          <div className="sm:mx-auto sm:col-span-4 flex flex-col justify-center">
            <header className="mb-3 ml-4">
              <h1 className="text-3xl font-semibold text-black ">
                {priestName}
              </h1>
              <h2 className="text-muted-foreground text-sm mb-4 ">
                Schedule an in-person or over the phone meeting.
              </h2>
            </header>
            <div className="border p-2 shadow-sm rounded-md">
              <UserCalendar
                mode="single"
                selected={date}
                onSelect={(e) => {
                  handleDateSelect(e!);
                }}
                initialFocus
              />
            </div>
          </div>

          <div className="sm:col-span-2 h-full">
            <MeetingForm date={date} meetings={meetings} />
          </div>
        </div>
      </main>
    </div>
  );
};

type MeetingFormProps = {
  date: Date;
  meetings: Meeting[];
};

export default function MeetingForm({ date, meetings }: MeetingFormProps) {
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [meetingType, setMeetingType] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);

  const meetingsOfDay = meetings.filter((m) => {
    return new Date(m.startTime).toDateString() === date?.toDateString();
  });

  const bookedTimes = meetingsOfDay.map((m) => {
    const tempDate = new Date(m.startTime);
    console.log(tempDate);
    console.log(m.startTime);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(tempDate);
  });

  console.log(meetingsOfDay);
  console.log(bookedTimes);

  let amSlots = Array.from({ length: 12 }, (_, i) => {
    return i > 7 ? [`${i}:00 AM`, `${i}:30 AM`] : [];
  });
  let pmSlots = Array.from({ length: 12 }, (_, i) => {
    return i <= 10
      ? i == 0
        ? [`${12}:00 PM`, `${12}:30 PM`]
        : [`${i}:00 PM`, `${i}:30 PM`]
      : [];
  });

  let timeslotsFat = [...amSlots, ...pmSlots];
  let timeslots = timeslotsFat.flat(1);

  const availableTimes = timeslots.filter(
    (time) => !bookedTimes.includes(time)
  );

  // Helper function to format the time and date
  const getDateTime = (time: string) => {
    const [timeString, period] = time.split(" ");
    const [hours, minutes] = timeString.split(":");

    let hour24 = parseInt(hours);
    if (period === "PM" && hour24 < 12) hour24 += 12;

    const newDate = new Date(date);
    newDate.setHours(hour24, parseInt(minutes));
    return newDate;
  };

  const submitForm = async () => {
    const startTime = getDateTime(selectedTime!);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // Add 30 minutes to start time for end time

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      MeetingType: meetingType,
      AbounaId: "1",
      SchedulingUserName: name,
      SchedulingUserEmail: email,
      StartTime: startTime.toISOString(),
      EndTime: endTime.toISOString(),
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      //redirect: "follow"
    };

    try {
      const response = await fetch(
        "http://localhost:5192/api/meetings/book",
        requestOptions
      );

      if (response.ok) {
        const bookedMeeting = await response.json();
        console.log("Meeting created successfully", bookedMeeting);
        window.location.href = `http://localhost:3000/meeting-booked?name=${encodeURIComponent(bookedMeeting.name)}&date=${encodeURIComponent(bookedMeeting.date)}&time=${encodeURIComponent(bookedMeeting.time)}`;
      } else {
        console.error("Error creating meeting:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form
        className="grid w-full items-start gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Scheduler Info
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Meeting Type</Label>
            <Select onValueChange={(v) => setMeetingType(v)}>
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a Meeting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In-Person">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        1 on 1{" "}
                        <span className="font-medium text-foreground">
                          with Abouna
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Time for confession, guidance, or any other personal
                        needs.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="Phone Call">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        Phone Call
                        <span className="font-medium text-foreground">
                          {" "}
                          with Abouna
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        A call to discuss any topic or ask any questions.
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Ex: John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Ex: Johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Available Timeslots on {date?.toDateString()}
          </legend>
          <ScrollArea className="h-[340px] rounded-md ">
            <div className="p-4 space-y-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTime(time);
                  }}
                  className="w-full justify-start"
                >
                  {time}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </fieldset>

        <Button type="submit" className="w-full justify-center">
          Submit
        </Button>
      </form>
    </div>
  );
}
