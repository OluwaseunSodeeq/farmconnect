import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const salesData = [
  { name: "Mon", sales: 4200, orders: 45 },
  { name: "Tue", sales: 3800, orders: 38 },
  { name: "Wed", sales: 5100, orders: 52 },
  { name: "Thu", sales: 4600, orders: 48 },
  { name: "Fri", sales: 6200, orders: 65 },
  { name: "Sat", sales: 7400, orders: 78 },
  { name: "Sun", sales: 5800, orders: 61 },
];

export default function SalesOverview() {
  return (
    <Card className="lg:col-span-2 border-none shadow-sm">
      <CardHeader>
        <CardTitle>Sales Overview (This Week)</CardTitle>
        <p className="text-sm text-gray-500">
          Daily sales performance and order trends
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2ECC71"
              strokeWidth={3}
              name="Sales (UGX)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3498DB"
              strokeWidth={3}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
