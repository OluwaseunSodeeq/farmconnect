"use client";


import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Badge } from "../ui/Badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/Table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../ui/Card";

const statsCards = [
  {
    title: "Total Users",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#2ECC71",
    subtext: "8,234 Farmers • 4,224 Buyers"
  },
  {
    title: "Products Listed",
    value: "3,847",
    change: "+8.2%",
    trend: "up",
    icon: Package,
    color: "#3498DB",
    subtext: "234 pending approval"
  },
  {
    title: "Total Orders",
    value: "24,571",
    change: "+18.7%",
    trend: "up",
    icon: ShoppingCart,
    color: "#9B59B6",
    subtext: "1,247 this month"
  },
  {
    title: "Total Revenue",
    value: "UGX 847M",
    change: "+24.3%",
    trend: "up",
    icon: DollarSign,
    color: "#F39C12",
    subtext: "UGX 67M commission"
  }
];

const salesData = [
  { name: "Mon", sales: 4200, orders: 45 },
  { name: "Tue", sales: 3800, orders: 38 },
  { name: "Wed", sales: 5100, orders: 52 },
  { name: "Thu", sales: 4600, orders: 48 },
  { name: "Fri", sales: 6200, orders: 65 },
  { name: "Sat", sales: 7400, orders: 78 },
  { name: "Sun", sales: 5800, orders: 61 }
];

const userActivityData = [
  { name: "Active Farmers", value: 6847, color: "#2ECC71" },
  { name: "Active Buyers", value: 3421, color: "#3498DB" },
  { name: "Inactive Users", value: 2190, color: "#95A5A6" }
];

const topCrops = [
  { name: "Maize", sales: "UGX 145M", quantity: "2,450 tons", growth: "+15%", trend: "up" },
  { name: "Coffee", sales: "UGX 128M", quantity: "1,840 tons", growth: "+22%", trend: "up" },
  { name: "Beans", sales: "UGX 98M", quantity: "1,560 tons", growth: "+8%", trend: "up" },
  { name: "Cassava", sales: "UGX 76M", quantity: "3,200 tons", growth: "-3%", trend: "down" },
  { name: "Sweet Potato", sales: "UGX 54M", quantity: "1,890 tons", growth: "+12%", trend: "up" }
];

const recentNotifications = [
  { type: "New User", message: "15 new farmers registered today", time: "5 min ago", status: "info" },
  { type: "Verification", message: "23 farmers pending verification", time: "15 min ago", status: "warning" },
  { type: "Dispute", message: "3 new disputes require attention", time: "1 hour ago", status: "error" },
  { type: "Order", message: "127 orders completed today", time: "2 hours ago", status: "success" }
];

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1 text-xl font-semibold">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back! Here&#39;s what&#39;s happening with FarmConnect today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-gray-900 text-2xl font-semibold mb-1">{stat.value}</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          stat.trend === "up"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } flex items-center gap-1`}
                      >
                        {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{stat.subtext}</p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Sales Overview (This Week)</CardTitle>
            <p className="text-sm text-gray-500">Daily sales performance and order trends</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#2ECC71" strokeWidth={3} name="Sales (UGX)" />
                <Line type="monotone" dataKey="orders" stroke="#3498DB" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Activity */}
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
      </div>

      {/* Top Crops + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Crops */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Top-Selling Crops</CardTitle>
            <p className="text-sm text-gray-500">Best performing products this month</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCrops.map((crop, index) => (
                  <TableRow key={index}>
                    <TableCell>{crop.name}</TableCell>
                    <TableCell>{crop.sales}</TableCell>
                    <TableCell className="text-gray-500">{crop.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          crop.trend === "up"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {crop.growth}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <p className="text-sm text-gray-500">Important updates and alerts</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    notification.status === "info"
                      ? "text-blue-500"
                      : notification.status === "warning"
                      ? "text-yellow-500"
                      : notification.status === "error"
                      ? "text-red-500"
                      : "text-green-500"
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-900">{notification.type}</span>
                      <Badge variant="outline" className="text-xs">{notification.time}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <p className="text-sm text-gray-500">Items requiring your attention</p>
            </div>
            <Badge className="bg-red-100 text-red-700">47 Pending</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-700 mb-1">Farmer Verifications</p>
              <h4 className="text-yellow-900 font-semibold">23</h4>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700 mb-1">Product Listings</p>
              <h4 className="text-blue-900 font-semibold">15</h4>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
              <p className="text-sm text-purple-700 mb-1">Dispute Cases</p>
              <h4 className="text-purple-900 font-semibold">6</h4>
            </div>
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <p className="text-sm text-orange-700 mb-1">Refund Requests</p>
              <h4 className="text-orange-900 font-semibold">3</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
