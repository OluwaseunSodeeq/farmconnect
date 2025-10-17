'use client';

import React from 'react';
import { Search, Filter, Plus, MoreVertical, Eye, Check, X, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import DropDown from '../../components/DropDown';
import { Input } from '../../ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/Table';


// ✅ Basic reusable Tailwind components (no Radix / shadcn)

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

// ✅ Mock Data
const products = [
  { id: 'P001', name: 'Organic Maize', category: 'Grains', farmer: 'John Mukasa', price: 'UGX 2,500/kg', quantity: '500 kg', status: 'approved', views: 847, sales: 234, rating: 4.8, listed: '2024-09-15' },
  { id: 'P002', name: 'Fresh Tomatoes', category: 'Vegetables', farmer: 'Mary Nambi', price: 'UGX 3,000/kg', quantity: '200 kg', status: 'approved', views: 1234, sales: 456, rating: 4.9, listed: '2024-10-01' },
  { id: 'P003', name: 'Coffee Beans', category: 'Cash-Crops', farmer: 'David Ouma', price: 'UGX 15,000/kg', quantity: '100 kg', status: 'pending', views: 234, sales: 0, rating: 0, listed: '2024-10-14' },
  { id: 'P004', name: 'Sweet Potatoes', category: 'Tubers', farmer: 'Sarah Akello', price: 'UGX 1,800/kg', quantity: '800 kg', status: 'approved', views: 567, sales: 189, rating: 4.6, listed: '2024-09-28' },
  { id: 'P005', name: 'Fresh Cabbage', category: 'Vegetables', farmer: 'Peter Mwesigwa', price: 'UGX 2,000/kg', quantity: '300 kg', status: 'rejected', views: 45, sales: 0, rating: 0, listed: '2024-10-10' },
  { id: 'P006', name: 'Beans (Red)', category: 'Legumes', farmer: 'John Mukasa', price: 'UGX 3,500/kg', quantity: '600 kg', status: 'approved', views: 923, sales: 312, rating: 4.7, listed: '2024-09-20' },
];

const categories = [
  { name: 'Vegetables', count: 847, trending: true },
  { name: 'Grains', count: 623, trending: true },
  { name: 'Fruits', count: 412, trending: false },
  { name: 'Legumes', count: 389, trending: true },
  { name: 'Cash Crops', count: 267, trending: false },
  { name: 'Tubers', count: 234, trending: false },
];

// ✅ Main Component
export default function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
          <p className="text-gray-500">Monitor and manage all farm products on the platform</p>
        </div>
        <Button className="bg-[#2ECC71] hover:bg-[#27AE60] text-white">
           <Plus className="w-4 h-4 mr-2" />
                  Add Products
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Total Products</p>
            <h3 className="text-xl text-gray-900 mb-2">3,847</h3>
            <Badge className="bg-green-100 text-green-700">+234 this month</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Pending Approval</p>
            <h3 className="text-xl text-gray-900 mb-2">234</h3>
            <Badge className="bg-yellow-100 text-yellow-700">Needs review</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Active Listings</p>
            <h3 className="text-xl text-gray-900 mb-2">3,456</h3>
            <Badge className="bg-blue-100 text-blue-700">Live now</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
            <h3 className="text-xl text-gray-900 mb-2">157</h3>
            <Badge className="bg-red-100 text-red-700">Needs restocking</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">{cat.name}</span>
                    {cat.trending && <TrendingUp className="w-3 h-3 text-green-600" />}
                  </div>
                  <Badge className="border border-gray-200">{cat.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">Listed {p.listed}</p>
                    </TableCell>
                    <TableCell><Badge className="border border-gray-200">{p.category}</Badge></TableCell>
                    <TableCell>{p.farmer}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          p.status === 'approved' && 'bg-green-100 text-green-700',
                          p.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                          p.status === 'rejected' && 'bg-red-100 text-red-700',
                          'capitalize'
                        )}
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p>{p.views} views</p>
                      <p className="text-xs text-gray-500">{p.sales} sales</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
// Addition of filter and Sorting
export function ProductManagement() {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesStatus =
      statusFilter === 'All Status' || p.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory =
      categoryFilter === 'All Categories' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
          <p className="text-gray-500">Monitor and manage all farm products</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardContent><p className="text-sm text-gray-500 mb-1">Total Products</p><h3 className="text-xl text-gray-900 mb-2">3,847</h3><Badge className="bg-green-100 text-green-700">+234 this month</Badge></CardContent></Card>
        <Card><CardContent><p className="text-sm text-gray-500 mb-1">Pending Approval</p><h3 className="text-xl text-gray-900 mb-2">234</h3><Badge className="bg-yellow-100 text-yellow-700">Needs review</Badge></CardContent></Card>
        <Card><CardContent><p className="text-sm text-gray-500 mb-1">Active Listings</p><h3 className="text-xl text-gray-900 mb-2">3,456</h3><Badge className="bg-blue-100 text-blue-700">Live now</Badge></CardContent></Card>
        <Card><CardContent><p className="text-sm text-gray-500 mb-1">Out of Stock</p><h3 className="text-xl text-gray-900 mb-2">157</h3><Badge className="bg-red-100 text-red-700">Needs restocking</Badge></CardContent></Card>
      </div>

      {/* Categories + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader><CardTitle>Product Categories</CardTitle></CardHeader>
          <CardContent>
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">{cat.name}</span>
                  {cat.trending && <TrendingUp className="w-3 h-3 text-green-600" />}
                </div>
                <Badge className="border border-gray-200">{cat.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropDown
                label="Status"
                options={['All Status', 'Approved', 'Pending', 'Rejected']}
                selected={statusFilter}
                onChange={setStatusFilter}
              />
              <DropDown
                label="Category"
                options={['All Categories', 'Vegetables', 'Grains', 'Cash Crops', 'Tubers']}
                selected={categoryFilter}
                onChange={setCategoryFilter}
              />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">Listed {p.listed}</p>
                    </TableCell>
                    <TableCell><Badge className="border border-gray-200">{p.category}</Badge></TableCell>
                    <TableCell>{p.farmer}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          p.status === 'approved' && 'bg-green-100 text-green-700',
                          p.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                          p.status === 'rejected' && 'bg-red-100 text-red-700'
                        )}
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p>{p.views} views</p>
                      <p className="text-xs text-gray-500">{p.sales} sales</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-6">No products found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}