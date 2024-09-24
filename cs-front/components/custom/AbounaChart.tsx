"use client";

import * as React from "react";
import { CalendarClock } from "lucide-react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { allMeetings } from "@/constants/meetings";
import { format } from "date-fns";

export const description =
  "A donut chart showing remaining meetings for the day";

const chartData = [
  { type: "Calls", count: 2, fill: "hsl(var(--chart-1))" },
  { type: "In-Person", count: 1, fill: "hsl(var(--chart-2))" },
  { type: "1-1", count: 3, fill: "hsl(var(--chart-3))" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  team: {
    label: "Team Meetings",
    color: "hsl(var(--chart-1))",
  },
  client: {
    label: "Client Meetings",
    color: "hsl(var(--chart-2))",
  },
  "1on1": {
    label: "1-on-1 Meetings",
    color: "hsl(var(--chart-3))",
  },
  planning: {
    label: "Planning Sessions",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 rounded shadow">
        <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export function AbounaChart() {
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const meetingCount = allMeetings.filter(
    (m) => m.date === formattedDate
  ).length;

  return (
    <Card className="flex flex-col max-h-[500px]">
      <CardHeader className="items-center pb-0">
        <CardTitle> Meetings Today</CardTitle>
        <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-[350px]"
        >
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {meetingCount}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {meetingCount === 1 ? "Meeting" : "Meetings"}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-sm">
        <div className="flex items-center gap-2 font-medium leading-none mb-3">
          Next meeting in 30 minutes <CalendarClock className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing remaining meetings for today
        </div>
      </CardFooter>
    </Card>
  );
}
