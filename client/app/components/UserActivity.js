import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const userActivityData = [
  { name: "Active Farmers", value: 6847, color: "#2ECC71" },
  { name: "Active Buyers", value: 3421, color: "#3498DB" },
  { name: "Inactive Users", value: 2190, color: "#95A5A6" },
];

export default function UserActivity() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <p className="text-sm text-gray-500">Active vs Inactive users</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userActivityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {userActivityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
