import React from 'react';
import {
  Calendar,
  Download,
  FileText,
  TrendingUp,
  Users,
  Package,
  ShoppingCart, 
} from 'lucide-react';
import {
//   BarChart,
//   Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Label } from '../../ui/Label';
import { Button } from '../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../../ui/Select';


// Report data
const reportTypes = [
  {
    id: 'sales-report',
    title: 'Sales Report',
    description: 'Detailed sales data by product, farmer, or region',
    icon: TrendingUp,
    color: '#2ECC71',
    lastGenerated: '2024-10-16',
    frequency: 'Daily',
  },
  {
    id: 'user-growth',
    title: 'User Growth Report',
    description: 'Track farmer and buyer registration trends',
    icon: Users,
    color: '#3498DB',
    lastGenerated: '2024-10-15',
    frequency: 'Weekly',
  },
  {
    id: 'product-performance',
    title: 'Product Performance',
    description: 'Top performing products and categories',
    icon: Package,
    color: '#9B59B6',
    lastGenerated: '2024-10-16',
    frequency: 'Monthly',
  },
  {
    id: 'transaction-history',
    title: 'Transaction History',
    description: 'Complete transaction and payment records',
    icon: ShoppingCart,
    color: '#F39C12',
    lastGenerated: '2024-10-16',
    frequency: 'Daily',
  },
];

const recentReports = [
  {
    id: 'RPT-001',
    name: 'Monthly Sales Report - September 2024',
    type: 'Sales Report',
    generatedBy: 'Admin User',
    generatedAt: '2024-10-01 09:00 AM',
    fileSize: '2.4 MB',
    format: 'PDF',
    downloads: 12,
  },
  {
    id: 'RPT-002',
    name: 'User Growth Analysis - Q3 2024',
    type: 'User Growth Report',
    generatedBy: 'Admin User',
    generatedAt: '2024-10-05 02:30 PM',
    fileSize: '1.8 MB',
    format: 'CSV',
    downloads: 8,
  },
  {
    id: 'RPT-003',
    name: 'Product Performance - October Week 2',
    type: 'Product Performance',
    generatedBy: 'Admin User',
    generatedAt: '2024-10-14 11:15 AM',
    fileSize: '3.1 MB',
    format: 'PDF',
    downloads: 5,
  },
  {
    id: 'RPT-004',
    name: 'Transaction Log - October 2024',
    type: 'Transaction History',
    generatedBy: 'System Auto',
    generatedAt: '2024-10-16 08:00 AM',
    fileSize: '5.7 MB',
    format: 'CSV',
    downloads: 15,
  },
];

const monthlyData = [
  { month: 'Apr', revenue: 450000, users: 320, products: 156 },
  { month: 'May', revenue: 520000, users: 387, products: 189 },
  { month: 'Jun', revenue: 480000, users: 412, products: 201 },
  { month: 'Jul', revenue: 610000, users: 456, products: 234 },
  { month: 'Aug', revenue: 580000, users: 503, products: 267 },
  { month: 'Sep', revenue: 670000, users: 578, products: 298 },
  { month: 'Oct', revenue: 730000, users: 623, products: 324 },
];

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Reports & Export</h2>
        <p className="text-gray-500">
          Generate, view, and export platform analytics reports
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Reports Generated',
            value: '247',
            badge: 'This month',
            color: 'blue',
            icon: FileText,
          },
          {
            title: 'Total Downloads',
            value: '1,847',
            badge: 'All time',
            color: 'green',
            icon: Download,
          },
          {
            title: 'Scheduled Reports',
            value: '12',
            badge: 'Auto-generate',
            color: 'purple',
            icon: Calendar,
          },
          {
            title: 'Storage Used',
            value: '34.8 GB',
            badge: '68% capacity',
            color: 'yellow',
            icon: FileText,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.value}</h3>
                    <Badge className={`bg-${item.color}-100 text-${item.color}-700`}>
                      {item.badge}
                    </Badge>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${item.color}-100`}
                  >
                    <Icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generate New Report Section */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <p className="text-sm text-gray-500">
            Create custom reports with your preferred parameters
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Report Type',
                defaultValue: 'sales',
                items: [
                  'Sales Report',
                  'User Growth Report',
                  'Product Performance',
                  'Transaction History',
                  'Farmer Analytics',
                  'Regional Analysis',
                ],
              },
              {
                label: 'Time Period',
                defaultValue: 'month',
                items: [
                  'Today',
                  'This Week',
                  'This Month',
                  'This Quarter',
                  'This Year',
                  'Custom Range',
                ],
              },
              {
                label: 'Export Format',
                defaultValue: 'pdf',
                items: ['PDF Document', 'CSV Spreadsheet', 'Excel Workbook', 'JSON Data'],
              },
            ].map((select, i) => (
              <div key={i}>
                <Label>{select.label}</Label>
                <Select defaultValue={select.defaultValue}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${select.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {select.items.map((item, idx) => (
                      <SelectItem key={idx} value={item.toLowerCase().replace(/\s/g, '-')}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
            <div className="flex items-end">
              <Button className="bg-[#2ECC71] hover:bg-[#27AE60] w-full">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div>
        <h3 className="text-gray-900 mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card
                key={report.id}
                className="border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${report.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: report.color }} />
                  </div>
                  <h4 className="text-gray-900 mb-2">{report.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                  <div className="space-y-2 mb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Frequency:</span>
                      <Badge variant="outline">{report.frequency}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Generated:</span>
                      <span className="text-gray-900">{report.lastGenerated}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Monthly Overview Chart */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Monthly Performance Overview</CardTitle>
          <p className="text-sm text-gray-500">Track key metrics over time</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2ECC71" strokeWidth={3} />
              <Line type="monotone" dataKey="users" stroke="#3498DB" strokeWidth={3} />
              <Line type="monotone" dataKey="products" stroke="#9B59B6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <p className="text-sm text-gray-500">
            Previously generated reports available for download
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#2ECC71] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{report.name}</h4>
                    <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
                      <span>Generated by {report.generatedBy}</span>
                      <span>• {report.generatedAt}</span>
                      <span>• {report.fileSize}</span>
                      <Badge variant="outline" className="text-xs">
                        {report.format}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">{report.downloads} downloads</p>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
