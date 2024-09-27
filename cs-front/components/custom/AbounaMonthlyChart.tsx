"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import MeetingStore from "@/hooks/useMeeting";
import { months } from "@/constants/months";

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function AbounaMonthlyBarChart() {
  const begin = months[0];
  const end = months[months.length - 1];
  const { meetings } = MeetingStore();
  const MonthMap = new Map();
  for (const month of months) {
    MonthMap.set(month, 0);
  }

  for (const meeting of meetings) {
    const month = new Date(meeting.startTime).getMonth();
    const monthName = months[month];
    MonthMap.set(monthName, MonthMap.get(monthName) + 1);
  }

  const chartData = Array.from(MonthMap).map(([month, desktop]) => ({
    month,
    desktop,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meetings Per Month </CardTitle>
        <CardDescription>{`${begin} - ${end} `}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
