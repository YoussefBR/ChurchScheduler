"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function QuickSchedule() {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [meetingType, setMeetingType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const ampm = hour < 12 ? "AM" : "PM";
    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${formattedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`;
  });

  const getDateTime = (date: Date, time: string) => {
    const [timePart, modifier] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);
    if (modifier === "PM" && hour < 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    const combinedDate = new Date(date);
    combinedDate.setHours(hour, minute, 0, 0); // Set hours, minutes, seconds to 0

    return combinedDate;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const startTime = getDateTime(date!, selectedTime); // Combine date and selected time
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
        window.location.href = `http://localhost:3000/meeting-booked`;
      } else {
        console.error("Error creating meeting:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <div className="mt-6 px-6 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Quick Schedule a Meeting</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meetingType">Meeting Type</Label>
                <Select>
                  <SelectTrigger id="meetingType">
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-1">1-1</SelectItem>
                    <SelectItem value="phone-call">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parishMember">Parish Member</Label>
                <Input id="parishMember" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parishMember-email">Member Email</Label>
                <Input id="parishMember-email" placeholder="Enter Email" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[200px]">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Schedule Meeting
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
