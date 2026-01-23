'use client';
import { Search, Filter, UserPlus, MoreVertical, CheckCircle, XCircle, Mail } from 'lucide-react';

import { Button } from "../../ui/Button";
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/Tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/Table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu';

// import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
// import { Badge } from '../ui/Badge';
// import { Button } from '../ui/Button';
// import { Input } from '../ui/Input';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../ui/DropdownMenu';

const farmers = [
  { id: 'F001', name: 'John Mukasa', farm: 'Mukasa Farm', phone: '+256 700 123 456', location: 'Kampala', status: 'verified', products: 45, joinDate: '2024-01-15' },
  { id: 'F002', name: 'Mary Nambi', farm: 'Green Valley Farm', phone: '+256 700 234 567', location: 'Jinja', status: 'verified', products: 32, joinDate: '2024-02-20' },
  { id: 'F003', name: 'David Ouma', farm: 'Sunrise Farms', phone: '+256 700 345 678', location: 'Mbale', status: 'pending', products: 12, joinDate: '2024-09-10' },
  { id: 'F004', name: 'Sarah Akello', farm: 'Akello Organic', phone: '+256 700 456 789', location: 'Gulu', status: 'verified', products: 28, joinDate: '2024-03-05' },
  { id: 'F005', name: 'Peter Mwesigwa', farm: 'Highland Produce', phone: '+256 700 567 890', location: 'Kabale', status: 'suspended', products: 8, joinDate: '2024-04-12' },
];

const buyers = [
  { id: 'B001', name: 'Grace Hotel', contact: 'Jane Nakato', phone: '+256 700 111 222', location: 'Kampala', status: 'active', orders: 234, joinDate: '2023-11-10' },
  { id: 'B002', name: 'Fresh Market Ltd', contact: 'Tom Odongo', phone: '+256 700 222 333', location: 'Entebbe', status: 'active', orders: 189, joinDate: '2023-12-15' },
  { id: 'B003', name: 'Restaurant Hub', contact: 'Alice Namukasa', phone: '+256 700 333 444', location: 'Kampala', status: 'active', orders: 145, joinDate: '2024-01-20' },
  { id: 'B004', name: 'City Supermarket', contact: 'James Okello', phone: '+256 700 444 555', location: 'Jinja', status: 'inactive', orders: 67, joinDate: '2024-02-28' },
];

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">User Management</h2>
          <p className="text-gray-500">Manage all farmers and buyers on the platform</p>
        </div>
        <Button className="bg-[#2ECC71] hover:bg-[#27AE60] text-white">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Farmers</p>
            <h3 className="text-gray-900 mb-2">8,234</h3>
            <Badge className="bg-green-100 text-green-700">+127 this month</Badge>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Buyers</p>
            <h3 className="text-gray-900 mb-2">4,224</h3>
            <Badge className="bg-blue-100 text-blue-700">+89 this month</Badge>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Pending Verification</p>
            <h3 className="text-gray-900 mb-2">23</h3>
            <Badge className="bg-yellow-100 text-yellow-700">Needs attention</Badge>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Suspended Users</p>
            <h3 className="text-gray-900 mb-2">47</h3>
            <Badge className="bg-red-100 text-red-700">Review cases</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Section */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by name, farm, phone..." className="pl-10" />
              </div>
              <Button variant="outline" className="border-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="farmers" className="w-full">
            {/* Tabs Header */}
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="farmers"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2ECC71]"
              >
                Farmers ({farmers.length})
              </TabsTrigger>
              <TabsTrigger
                value="buyers"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2ECC71]"
              >
                Buyers ({buyers.length})
              </TabsTrigger>
            </TabsList>

            {/* Farmers Table */}
            <TabsContent value="farmers" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Farm Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell>{farmer.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{farmer.name}</p>
                          <p className="text-xs text-gray-500">Joined {farmer.joinDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{farmer.farm}</TableCell>
                      <TableCell className="text-gray-500">{farmer.phone}</TableCell>
                      <TableCell className="text-gray-500">{farmer.location}</TableCell>
                      <TableCell>{farmer.products}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            farmer.status === 'verified'
                              ? 'bg-green-100 text-green-700'
                              : farmer.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          {farmer.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {farmer.status === 'suspended' && <XCircle className="w-3 h-3 mr-1" />}
                          {farmer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            {farmer.status === 'pending' && (
                              <DropdownMenuItem className="text-green-600">
                                Approve Verification
                              </DropdownMenuItem>
                            )}
                            {farmer.status !== 'suspended' && (
                              <DropdownMenuItem className="text-red-600">
                                Suspend User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Buyers Table */}
            <TabsContent value="buyers" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyer ID</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buyers.map((buyer) => (
                    <TableRow key={buyer.id}>
                      <TableCell>{buyer.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{buyer.name}</p>
                          <p className="text-xs text-gray-500">Joined {buyer.joinDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{buyer.contact}</TableCell>
                      <TableCell className="text-gray-500">{buyer.phone}</TableCell>
                      <TableCell className="text-gray-500">{buyer.location}</TableCell>
                      <TableCell>{buyer.orders}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            buyer.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {buyer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
