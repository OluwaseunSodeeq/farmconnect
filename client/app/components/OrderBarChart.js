import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const revenueData = [
  { month: "Apr", revenue: 45000, commission: 4500 },
  { month: "May", revenue: 52000, commission: 5200 },
  { month: "Jun", revenue: 48000, commission: 4800 },
  { month: "Jul", revenue: 61000, commission: 6100 },
  { month: "Aug", revenue: 58000, commission: 5800 },
  { month: "Sep", revenue: 67000, commission: 6700 },
  { month: "Oct", revenue: 73000, commission: 7300 },
];

export default function OrderBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Commission Analytics</CardTitle>
        <p className="text-sm text-gray-500">
          Monthly revenue breakdown and platform earnings
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#2ECC71"
              name="Revenue (K)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="commission"
              fill="#3498DB"
              name="Commission (K)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
