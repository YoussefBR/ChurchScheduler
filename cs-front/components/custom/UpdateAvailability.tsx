import React, { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function UpdateAvailability() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [availability, setAvailability] = useState<{
    [key: string]: { start: string; end: string };
  }>(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { start: "09:00", end: "17:00" },
      }),
      {}
    )
  );

  const handleAvailabilityChange = (
    day: string,
    field: string,
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSaveAvailability = () => {
    console.log("Saving availability:", availability);
    // Here you would typically send this data to your backend
  };
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Update Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveAvailability();
          }}
          className="space-y-4"
        >
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <Label htmlFor={`${day}-start`} className="w-24">
                {day}
              </Label>
              <Input
                id={`${day}-start`}
                type="time"
                value={availability[day].start}
                onChange={(e) =>
                  handleAvailabilityChange(day, "start", e.target.value)
                }
                className="w-24"
              />
              <span>to</span>
              <Input
                id={`${day}-end`}
                type="time"
                value={availability[day].end}
                onChange={(e) =>
                  handleAvailabilityChange(day, "end", e.target.value)
                }
                className="w-24"
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Availability
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
