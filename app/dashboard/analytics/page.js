'use client';

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';

const salesTrendData = [
  { month: 'Jan', sales: 45000, target: 50000, growth: 15 },
  { month: 'Feb', sales: 52000, target: 55000, growth: 18 },
  { month: 'Mar', sales: 48000, target: 53000, growth: 12 },
  { month: 'Apr', sales: 61000, target: 58000, growth: 24 },
  { month: 'May', sales: 58000, target: 60000, growth: 19 },
  { month: 'Jun', sales: 67000, target: 63000, growth: 28 },
  { month: 'Jul', sales: 73000, target: 68000, growth: 32 },
  { month: 'Aug', sales: 78000, target: 72000, growth: 35 },
  { month: 'Sep', sales: 82000, target: 75000, growth: 38 },
  { month: 'Oct', sales: 89000, target: 80000, growth: 42 },
];

const cropPerformance = [
  { crop: 'Maize', sales: 145000 },
  { crop: 'Coffee', sales: 128000 },
  { crop: 'Beans', sales: 98000 },
  { crop: 'Cassava', sales: 76000 },
  { crop: 'Sweet Potato', sales: 54000 },
  { crop: 'Tomatoes', sales: 89000 },
];

const regionData = [
  { region: 'Kampala', value: 34500, color: '#2ECC71' },
  { region: 'Jinja', value: 28900, color: '#3498DB' },
  { region: 'Mbale', value: 22400, color: '#9B59B6' },
  { region: 'Gulu', value: 18700, color: '#F39C12' },
  { region: 'Mbarara', value: 15600, color: '#E74C3C' },
  { region: 'Others', value: 12300, color: '#95A5A6' },
];

const seasonalData = [
  { season: 'Q1 2024', vegetables: 45000, grains: 38000, cash_crops: 28000 },
  { season: 'Q2 2024', vegetables: 52000, grains: 42000, cash_crops: 31000 },
  { season: 'Q3 2024', vegetables: 58000, grains: 48000, cash_crops: 35000 },
  { season: 'Q4 2024', vegetables: 48000, grains: 52000, cash_crops: 38000 },
];

export default function Page() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Farm & Market Analytics</h1>
          <p className="text-gray-500">Deep insights into platform performance and market trends</p>
        </div>
        <select className="mt-3 sm:mt-0 border border-gray-300 rounded-lg p-2 text-sm text-gray-700">
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Platform Sales', value: 'UGX 847M', change: '+24.3%', trend: 'up', color: 'green' },
          { title: 'Average Order Value', value: 'UGX 34,500', change: '+8.7%', trend: 'up', color: 'green' },
          { title: 'Conversion Rate', value: '18.4%', change: '-2.1%', trend: 'down', color: 'red' },
          { title: 'Active Transactions', value: '1,247', change: '+12.5%', trend: 'up', color: 'green' },
        ].map((metric, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">{metric.title}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{metric.value}</h3>
            <div className="flex items-center gap-2">
              {metric.trend === 'up' ? (
                <TrendingUp className={`w-4 h-4 text-${metric.color}-600`} />
              ) : (
                <TrendingDown className={`w-4 h-4 text-${metric.color}-600`} />
              )}
              <span className={`text-sm text-${metric.color}-600`}>{metric.change} vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-1">Sales Trend Analysis</h2>
        <p className="text-sm text-gray-500 mb-4">Monthly sales performance against targets</p>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={salesTrendData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey="sales" stroke="#2ECC71" strokeWidth={3} fill="url(#colorSales)" name="Actual Sales" />
            <Line type="monotone" dataKey="target" stroke="#95A5A6" strokeWidth={2} strokeDasharray="5 5" name="Target" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Crop Performance + Region Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-1">Crop Sales Performance</h2>
          <p className="text-sm text-gray-500 mb-4">Top performing crops by revenue</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="crop" type="category" stroke="#6B7280" width={100} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Bar dataKey="sales" fill="#2ECC71" radius={[0, 8, 8, 0]} name="Sales (UGX)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Region Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-1">Regional Sales Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Sales breakdown by region</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Seasonal Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-1">Seasonal Performance Trends</h2>
        <p className="text-sm text-gray-500 mb-4">Quarterly product category analysis</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={seasonalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="season" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="vegetables" stroke="#2ECC71" strokeWidth={3} name="Vegetables" />
            <Line type="monotone" dataKey="grains" stroke="#3498DB" strokeWidth={3} name="Grains" />
            <Line type="monotone" dataKey="cash_crops" stroke="#F39C12" strokeWidth={3} name="Cash Crops" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Regions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-1">Top Performing Regions</h2>
        <p className="text-sm text-gray-500 mb-4">Detailed regional breakdown</p>
        <div className="space-y-4">
          {regionData.map((region, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${region.color}20` }}>
                  <MapPin className="w-5 h-5" style={{ color: region.color }} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{region.region}</p>
                  <p className="text-sm text-gray-500">UGX {region.value.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 border rounded-lg px-2 py-1" style={{ borderColor: region.color }}>
                #{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
