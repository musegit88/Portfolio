"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const chartConfig = {
  views: {
    label: "Page Views",
    color: "#2563eb",
  },
  users: {
    label: "Active Users",
    color: "#60a5fa",
  },
  deviceUsers: {
    label: "Users",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

interface AnalyticsChartProps {
  trafficData?: { date: string; views: number; users: number }[];
  deviceData?: { device: string; users: string }[];
}

export function PageViewsChart({
  trafficData,
  deviceData,
}: AnalyticsChartProps) {
  // Format device data
  const formattedDeviceData = (deviceData || []).map((item) => ({
    ...item,
    users: parseInt(item.users, 10),
  }));

  return (
    <Card className="mt-4">
      <Tabs defaultValue="traffic" className="flex flex-col w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex flex-col gap-1">
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>
              Website traffic and device usage over the last 30 days.
            </CardDescription>
          </div>
          <TabsList>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          {/* TRAFFIC TAB */}
          <TabsContent value="traffic">
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={trafficData || []}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent labelKey="date" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>

          {/* DEVICES TAB */}
          <TabsContent value="devices">
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={formattedDeviceData}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="device"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent labelKey="device" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="users"
                  fill="var(--color-deviceUsers)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
