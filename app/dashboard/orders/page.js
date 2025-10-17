'use client';

import React, { useState } from 'react';
import {
  Search,
  Download,
  MoreVertical,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ChevronDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/Table';
import { cn } from '../../lib/utils';

// ✅ Small UI Helpers
// export function Card({ className, children }) {
//   return <div className={cn('rounded-xl border bg-white shadow-sm', className)}>{children}</div>;
// }
// export function CardHeader({ className, children }) {
//   return <div className={cn('p-4 border-b', className)}>{children}</div>;
// }
// export function CardTitle({ className, children }) {
//   return <h3 className={cn('text-lg font-semibold text-gray-900', className)}>{children}</h3>;
// }
// export function CardContent({ className, children }) {
//   return <div className={cn('p-4', className)}>{children}</div>;
// }
// export function Badge({ className, children }) {
//   return (
//     <span
//       className={cn(
//         'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
//         className
//       )}
//     >
//       {children}
//     </span>
//   );
// }
// export function Button({ className, children, ...props }) {
//   return (
//     <button
//       className={cn(
//         'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
//         'bg-emerald-600 text-white hover:bg-emerald-700',
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }
// export function Input({ className, ...props }) {
//   return (
//     <input
//       className={cn(
//         'flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400',
//         className
//       )}
//       {...props}
//     />
//   );
// }
// export function Table({ className, children }) {
//   return <table className={cn('w-full text-sm text-left text-gray-600', className)}>{children}</table>;
// }
// export function TableHeader({ children }) {
//   return <thead className="bg-gray-50 text-xs uppercase text-gray-500">{children}</thead>;
// }
// export function TableRow({ children, className }) {
//   return <tr className={cn('border-b hover:bg-gray-50', className)}>{children}</tr>;
// }
// export function TableHead({ children, className }) {
//   return <th className={cn('px-4 py-2 font-medium', className)}>{children}</th>;
// }
// export function TableBody({ children }) {
//   return <tbody>{children}</tbody>;
// }
// export function TableCell({ children, className }) {
//   return <td className={cn('px-4 py-2', className)}>{children}</td>;
// }

// ✅ Simple Dropdown for Filters
function Dropdown({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-40 h-9 px-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-green-400"
      >
        {selected || label}
        <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                'w-full text-left px-3 py-2 text-sm hover:bg-gray-100',
                opt === selected && 'bg-green-50 text-green-700 font-medium'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ Simple dropdown menu for “Actions”
function ActionMenu({ options }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-md transition"
      >
        <MoreVertical className="w-4 h-4 text-gray-600" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-44 rounded-md border border-gray-200 bg-white shadow-lg z-20">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setOpen(false)}
              className={cn(
                'w-full text-left px-4 py-2 text-sm hover:bg-gray-100',
                opt.danger && 'text-red-600'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ Mock Data
const orders = [
  { id: 'ORD-2024-001', buyer: 'Grace Hotel', farmer: 'John Mukasa', products: 'Maize, Beans', total: 'UGX 450,000', payment: 'paid', delivery: 'delivered', date: '2024-10-14' },
  { id: 'ORD-2024-002', buyer: 'Fresh Market Ltd', farmer: 'Mary Nambi', products: 'Tomatoes, Cabbage', total: 'UGX 280,000', payment: 'paid', delivery: 'in-transit', date: '2024-10-15' },
  { id: 'ORD-2024-003', buyer: 'Restaurant Hub', farmer: 'Sarah Akello', products: 'Sweet Potatoes', total: 'UGX 180,000', payment: 'pending', delivery: 'processing', date: '2024-10-16' },
  { id: 'ORD-2024-004', buyer: 'City Supermarket', farmer: 'David Ouma', products: 'Coffee Beans', total: 'UGX 1,200,000', payment: 'paid', delivery: 'delivered', date: '2024-10-13' },
  { id: 'ORD-2024-005', buyer: 'Grace Hotel', farmer: 'Peter Mwesigwa', products: 'Cabbage, Carrots', total: 'UGX 320,000', payment: 'failed', delivery: 'cancelled', date: '2024-10-15' },
];

const revenueData = [
  { month: 'Apr', revenue: 45000, commission: 4500 },
  { month: 'May', revenue: 52000, commission: 5200 },
  { month: 'Jun', revenue: 48000, commission: 4800 },
  { month: 'Jul', revenue: 61000, commission: 6100 },
  { month: 'Aug', revenue: 58000, commission: 5800 },
  { month: 'Sep', revenue: 67000, commission: 6700 },
  { month: 'Oct', revenue: 73000, commission: 7300 },
];

// ✅ Main Component
export default function Page() {
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All Payments');
  const [deliveryFilter, setDeliveryFilter] = useState('All Status');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.buyer.toLowerCase().includes(search.toLowerCase());
    const matchesPayment =
      paymentFilter === 'All Payments' || o.payment.toLowerCase() === paymentFilter.toLowerCase();
    const matchesDelivery =
      deliveryFilter === 'All Status' || o.delivery.toLowerCase() === deliveryFilter.toLowerCase();
    return matchesSearch && matchesPayment && matchesDelivery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1 text-xl font-semibold">Orders & Transactions</h2>
          <p className="text-gray-500">Track all marketplace orders and financial activities</p>
        </div>
        <Button className="bg-white border text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4 mr-2 text-gray-600" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardContent><div className="flex justify-between"><div><p className="text-sm text-gray-500 mb-1">Total Orders</p><h3 className="text-gray-900 mb-2 text-lg font-semibold">24,571</h3><Badge className="bg-blue-100 text-blue-700">1,247 this month</Badge></div><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100"><Package className="w-6 h-6 text-blue-600" /></div></div></CardContent></Card>
        <Card><CardContent><div className="flex justify-between"><div><p className="text-sm text-gray-500 mb-1">In Transit</p><h3 className="text-gray-900 mb-2 text-lg font-semibold">347</h3><Badge className="bg-yellow-100 text-yellow-700">Track deliveries</Badge></div><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-100"><Truck className="w-6 h-6 text-yellow-600" /></div></div></CardContent></Card>
        <Card><CardContent><div className="flex justify-between"><div><p className="text-sm text-gray-500 mb-1">Completed</p><h3 className="text-gray-900 mb-2 text-lg font-semibold">23,847</h3><Badge className="bg-green-100 text-green-700">97% success rate</Badge></div><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100"><CheckCircle className="w-6 h-6 text-green-600" /></div></div></CardContent></Card>
        <Card><CardContent><div className="flex justify-between"><div><p className="text-sm text-gray-500 mb-1">Failed/Cancelled</p><h3 className="text-gray-900 mb-2 text-lg font-semibold">377</h3><Badge className="bg-red-100 text-red-700">Review cases</Badge></div><div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-100"><XCircle className="w-6 h-6 text-red-600" /></div></div></CardContent></Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Commission Analytics</CardTitle>
          <p className="text-sm text-gray-500">Monthly revenue breakdown and platform earnings</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
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
              <Bar dataKey="revenue" fill="#2ECC71" name="Revenue (K)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="commission" fill="#3498DB" name="Commission (K)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>Recent Orders</CardTitle>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dropdown
                label="Payment"
                options={['All Payments', 'Paid', 'Pending', 'Failed']}
                selected={paymentFilter}
                onChange={setPaymentFilter}
              />
              <Dropdown
                label="Delivery"
                options={['All Status', 'Processing', 'In-Transit', 'Delivered', 'Cancelled']}
                selected={deliveryFilter}
                onChange={setDeliveryFilter}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{o.id}</TableCell>
                  <TableCell className="text-gray-900">{o.buyer}</TableCell>
                  <TableCell className="text-gray-500">{o.farmer}</TableCell>
                  <TableCell className="text-gray-500">{o.products}</TableCell>
                  <TableCell>{o.total}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        o.payment === 'paid' && 'bg-green-100 text-green-700',
                        o.payment === 'pending' && 'bg-yellow-100 text-yellow-700',
                        o.payment === 'failed' && 'bg-red-100 text-red-700'
                      )}
                    >
                      {o.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        o.delivery === 'delivered' && 'bg-green-100 text-green-700',
                        o.delivery === 'in-transit' && 'bg-blue-100 text-blue-700',
                        o.delivery === 'processing' && 'bg-yellow-100 text-yellow-700',
                        o.delivery === 'cancelled' && 'bg-red-100 text-red-700'
                      )}
                    >
                      {o.delivery}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{o.date}</TableCell>
                  <TableCell>
                    <ActionMenu
                      options={[
                        { label: 'View Details' },
                        { label: 'Track Delivery' },
                        { label: 'Contact Buyer' },
                        { label: 'Contact Farmer' },
                        o.payment === 'failed' && { label: 'Process Refund', danger: true },
                      ].filter(Boolean)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-6">No matching orders found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
