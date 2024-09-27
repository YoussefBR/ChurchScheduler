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
    return `${formattedHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${ampm}`;
  });

  // Helper function to format the time and date
  const getDateTime = (time: string) => {
    const [timeString, period] = time.split(" ");
    const [hours, minutes] = timeString.split(":");

    let hour24 = parseInt(hours);
    if (period === "PM" && hour24 < 12) hour24 += 12;

    const newDate = new Date(date!);
    newDate.setHours(hour24, parseInt(minutes));
    return newDate;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(selectedTime);
    console.log(date);
    const startTime = getDateTime(selectedTime); // Combine date and selected time
    const endTime = new Date(startTime.getTime() + 30 * 60000); // Add 30 minutes to start time for end time
    console.log(startTime);
    console.log(endTime);

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
    };

    try {
      const response = await fetch(
        "http://localhost:5192/api/meetings/book",
        requestOptions
      );

      if (response.ok) {
        const bookedMeeting = await response.json();
        console.log("Meeting created successfully", bookedMeeting);
        window.location.href = `http://localhost:3000/abouna-booked`;
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
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meetingType">Meeting Type</Label>
                <Select onValueChange={setMeetingType}> {/* Update the meeting type */}
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
                <Input 
                  id="parishMember" 
                  placeholder="Enter name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} // Update the name state
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parishMember-email">Member Email</Label>
                <Input 
                  id="parishMember-email" 
                  placeholder="Enter Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} // Update the email state
                />
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
                      onSelect={(date) => setDate(date!)}
                      initialFocus
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={(v) => setSelectedTime(v!)}> {/* Update the selected time */}
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[200px]">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time} onClick={()=> console.log(time)}>
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
