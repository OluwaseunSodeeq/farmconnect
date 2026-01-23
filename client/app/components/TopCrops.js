import { Badge } from "../ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

const topCrops = [
  {
    name: "Maize",
    sales: "UGX 145M",
    quantity: "2,450 tons",
    growth: "+15%",
    trend: "up",
  },
  {
    name: "Coffee",
    sales: "UGX 128M",
    quantity: "1,840 tons",
    growth: "+22%",
    trend: "up",
  },
  {
    name: "Beans",
    sales: "UGX 98M",
    quantity: "1,560 tons",
    growth: "+8%",
    trend: "up",
  },
  {
    name: "Cassava",
    sales: "UGX 76M",
    quantity: "3,200 tons",
    growth: "-3%",
    trend: "down",
  },
  {
    name: "Sweet Potato",
    sales: "UGX 54M",
    quantity: "1,890 tons",
    growth: "+12%",
    trend: "up",
  },
];

export default function TopCrops() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Top-Selling Crops</CardTitle>
        <p className="text-sm text-gray-500">
          Best performing products this month
        </p>
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
  );
}
