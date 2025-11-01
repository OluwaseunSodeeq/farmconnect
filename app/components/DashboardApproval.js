import { Badge } from "../ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export default function DashboardApproval() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pending Approvals</CardTitle>
            <p className="text-sm text-gray-500">
              Items requiring your attention
            </p>
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
  );
}
