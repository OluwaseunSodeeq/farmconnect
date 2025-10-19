"use client";
import {
  Building2,
  DollarSign,
  Tag,
  Zap,
  Users as UsersIcon,
  Save,
} from "lucide-react";

import { Card, CardContent } from "../../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { TextArea } from "../../ui/TextArea";
import { Switch } from "../../ui/Switch";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/Select";


const adminRoles = [
  {
    id: "ADM-001",
    name: "John Admin",
    email: "john@farmconnect.ug",
    role: "Super Admin",
    status: "active",
    lastLogin: "2024-10-16 08:30 AM",
  },
  {
    id: "ADM-002",
    name: "Sarah Support",
    email: "sarah@farmconnect.ug",
    role: "Support Admin",
    status: "active",
    lastLogin: "2024-10-16 09:15 AM",
  },
  {
    id: "ADM-003",
    name: "Mike Manager",
    email: "mike@farmconnect.ug",
    role: "Content Manager",
    status: "active",
    lastLogin: "2024-10-15 05:45 PM",
  },
  {
    id: "ADM-004",
    name: "Grace Finance",
    email: "grace@farmconnect.ug",
    role: "Finance Admin",
    status: "inactive",
    lastLogin: "2024-10-12 02:30 PM",
  },
];

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Settings</h2>
        <p className="text-gray-500">
          Manage platform configuration and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            {/* Tab List */}
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {[
                { value: "general", icon: Building2, label: "General Settings" },
                { value: "financial", icon: DollarSign, label: "Financial Settings" },
                { value: "categories", icon: Tag, label: "Categories & Tags" },
                { value: "integrations", icon: Zap, label: "Integrations" },
                { value: "roles", icon: UsersIcon, label: "Admin Roles" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#2ECC71] data-[state=active]:bg-transparent"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ===== GENERAL TAB ===== */}
            <TabsContent value="general" className="mt-6 space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="FarmConnect Uganda" />
                  </div>
                  <div>
                    <Label htmlFor="company-email">Contact Email</Label>
                    <Input
                      id="company-email"
                      type="email"
                      defaultValue="info@farmconnect.ug"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-phone">Contact Phone</Label>
                    <Input id="company-phone" defaultValue="+256 700 000 000" />
                  </div>
                  <div>
                    <Label htmlFor="company-website">Website</Label>
                    <Input
                      id="company-website"
                      defaultValue="https://farmconnect.ug"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="company-address">Physical Address</Label>
                    <TextArea
                      id="company-address"
                      defaultValue="Plot 123, Kampala Road, Kampala, Uganda"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Platform Settings */}
              <div>
                <h3 className="text-gray-900 mb-4">Platform Settings</h3>
                {[
                  {
                    title: "Enable New User Registrations",
                    desc: "Allow new farmers and buyers to register",
                    checked: true,
                  },
                  {
                    title: "Require Email Verification",
                    desc: "Users must verify email before access",
                    checked: true,
                  },
                  {
                    title: "Auto-Approve Products",
                    desc: "Automatically approve new product listings",
                    checked: false,
                  },
                  {
                    title: "Maintenance Mode",
                    desc: "Temporarily disable platform access",
                    checked: false,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 mb-2 rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* ===== FINANCIAL SETTINGS ===== */}
            <TabsContent value="financial" className="mt-6 space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Commission & Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      id: "commission-rate",
                      label: "Platform Commission Rate (%)",
                      defaultValue: "10",
                      note: "Percentage charged on each transaction",
                    },
                    {
                      id: "service-fee",
                      label: "Service Fee (UGX)",
                      defaultValue: "5000",
                      note: "Fixed fee per transaction",
                    },
                    {
                      id: "listing-fee",
                      label: "Product Listing Fee (UGX)",
                      defaultValue: "0",
                      note: "Fee for listing a new product",
                    },
                    {
                      id: "withdrawal-fee",
                      label: "Withdrawal Fee (UGX)",
                      defaultValue: "2000",
                      note: "Fee for withdrawing earnings",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        type="number"
                        defaultValue={field.defaultValue}
                      />
                      <p className="text-xs text-gray-500 mt-1">{field.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Toggles */}
              <div>
                <h3 className="text-gray-900 mb-4">Payment Settings</h3>
                {[
                  { title: "Enable Mobile Money", desc: "MTN, Airtel Money", checked: true },
                  { title: "Enable Bank Transfers", desc: "Direct bank deposits", checked: true },
                  { title: "Enable Cash on Delivery", desc: "Pay on delivery", checked: true },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 mb-2 rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* ===== CATEGORIES TAB ===== */}
            <TabsContent value="categories" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Product Categories</h3>
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60]">
                  Add New Category
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Vegetables",
                  "Grains",
                  "Fruits",
                  "Legumes",
                  "Cash Crops",
                  "Tubers",
                  "Livestock",
                  "Dairy Products",
                ].map((category, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-gray-200 hover:border-[#2ECC71] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 mb-1">{category}</p>
                        <Badge variant="outline">
                          {Math.floor(Math.random() * 500) + 100} products
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* ===== INTEGRATIONS TAB ===== */}
            <TabsContent value="integrations" className="mt-6 space-y-6">
              <h3 className="text-gray-900">Third-Party Integrations</h3>

              {/* Example: SMS Integration */}
              <div className="p-6 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-gray-900 mb-1">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Send SMS alerts to users
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Connected</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="sms-provider">SMS Provider</Label>
                    <Select defaultValue="africas-talking">
                      <SelectTrigger id="sms-provider">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africas-talking">
                          Africa&apos;s Talking
                        </SelectItem>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sms-api">API Key</Label>
                    <Input
                      id="sms-api"
                      type="password"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  Test SMS
                </Button>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* ===== ADMIN ROLES ===== */}
            <TabsContent value="roles" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Admin Users & Permissions</h3>
                <Button className="bg-[#2ECC71] hover:bg-[#27AE60]">
                  Add Admin User
                </Button>
              </div>

              <div className="space-y-3">
                {adminRoles.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#2ECC71] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">
                          {admin.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{admin.role}</Badge>
                      <Badge
                        className={
                          admin.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {admin.status}
                      </Badge>
                      <span className="text-xs text-gray-500 w-32">
                        {admin.lastLogin}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
