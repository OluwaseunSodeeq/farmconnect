import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card, CardContent } from "../ui/Card";

const statsCards = [
  {
    title: "Total Users",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#2ECC71",
    subtext: "8,234 Farmers • 4,224 Buyers",
  },
  {
    title: "Products Listed",
    value: "3,847",
    change: "+8.2%",
    trend: "up",
    icon: Package,
    color: "#3498DB",
    subtext: "234 pending approval",
  },
  {
    title: "Total Orders",
    value: "24,571",
    change: "+18.7%",
    trend: "up",
    icon: ShoppingCart,
    color: "#9B59B6",
    subtext: "1,247 this month",
  },
  {
    title: "Total Revenue",
    value: "UGX 847M",
    change: "+24.3%",
    trend: "up",
    icon: DollarSign,
    color: "#F39C12",
    subtext: "UGX 67M commission",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="border-none shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <h3 className="text-gray-900 text-2xl font-semibold mb-1">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        stat.trend === "up"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } flex items-center gap-1`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
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
  );
}
