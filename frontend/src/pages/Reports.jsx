import { useContext, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ItemsContext } from "@/context/ItemsContext";

function Reports() {
  const { items } = useContext(ItemsContext);

  const [date, setDate] = useState(new Date());

  const inventoryData = [
    { name: "Jan", total: 2 },
    { name: "Feb", total: 1 },
    { name: "Mar", total: 5 },
    { name: "Apr", total: 4 },
    { name: "May", total: 2 },
    { name: "Jun", total: 7 },
  ];

  const orderData = [
    { name: "Mon", total: 12 },
    { name: "Tue", total: 15 },
    { name: "Wed", total: 10 },
    { name: "Thu", total: 18 },
    { name: "Fri", total: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>

        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Select Date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {/* {CompanyNames.map((name) => ( */}
              <SelectItem value="all">All</SelectItem>
              {/* ))} */}
            </SelectContent>
          </Select>

          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inventoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  dataKey="total"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="total" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Reports;
