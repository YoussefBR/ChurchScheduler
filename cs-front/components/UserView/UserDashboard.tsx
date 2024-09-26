"use client";

import React from "react";
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

const priestName = "Fr. Danial Zaki";

export const UserDashboard: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
  };

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
                  console.log(e);
                  handleDateSelect(e!);
                }}
                initialFocus
              />
            </div>
          </div>

          <div className="sm:col-span-2 h-full">
            <MeetingForm date={date} />
          </div>
        </div>
      </main>
    </div>
  );
};

type MeetingFormProps = {
  date: Date;
};

export default function MeetingForm({ date }: MeetingFormProps) {
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [meetingType, setMeetingType] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);

  let amSlots = Array.from({ length: 12 }, (_, i) => {
    return i > 7 ? [`${i}:00 AM`, `${i}:30 AM`] : [];
  });
  let pmSlots = Array.from({ length: 12 }, (_, i) => {
    return i <= 10 ? [`${i}:00 PM`, `${i}:30 PM`] : [];
  });

  let timeslotsFat = [...amSlots, ...pmSlots];
  let timeslots = timeslotsFat.flat(1);

  return (
    <div className="relative flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
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
            Available Timeslots on {date.toDateString()}
          </legend>
          <ScrollArea className="h-[340px] rounded-md ">
            <div className="p-4 space-y-2">
              {timeslots.map((time) => (
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

        <Button
          type="submit"
          className="w-full justify-center"
          onClick={(e) => {
            e.preventDefault();
            console.log({
              date: date.toDateString(),
              time: selectedTime,
              type: meetingType,
              name,
              email,
            });
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
