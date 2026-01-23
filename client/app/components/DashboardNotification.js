import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";

const recentNotifications = [
  {
    type: "New User",
    message: "15 new farmers registered today",
    time: "5 min ago",
    status: "info",
  },
  {
    type: "Verification",
    message: "23 farmers pending verification",
    time: "15 min ago",
    status: "warning",
  },
  {
    type: "Dispute",
    message: "3 new disputes require attention",
    time: "1 hour ago",
    status: "error",
  },
  {
    type: "Order",
    message: "127 orders completed today",
    time: "2 hours ago",
    status: "success",
  },
];

export default function DashboardNotification() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
        <p className="text-sm text-gray-500">Important updates and alerts</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentNotifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  notification.status === "info"
                    ? "text-blue-500"
                    : notification.status === "warning"
                    ? "text-yellow-500"
                    : notification.status === "error"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-900">
                    {notification.type}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {notification.time}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
