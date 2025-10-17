"use client";

import React from "react";
import { CheckCircle, XCircle, Clock, FileCheck, Award, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import { Badge } from "../../ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { Button } from "../../ui/Button";


const farmerVerifications = [
  {
    id: "V001",
    farmer: "John Mukasa",
    farm: "Mukasa Farm",
    phone: "+256 700 123 456",
    location: "Kampala",
    idType: "National ID",
    idNumber: "CM1234567890",
    status: "pending",
    submitted: "2024-10-14",
    documents: ["ID Front", "ID Back", "Farm Photo"],
  },
  {
    id: "V002",
    farmer: "Mary Nambi",
    farm: "Green Valley Farm",
    phone: "+256 700 234 567",
    location: "Jinja",
    idType: "National ID",
    idNumber: "CM0987654321",
    status: "approved",
    submitted: "2024-10-10",
    documents: ["ID Front", "ID Back", "Farm Photo", "Certificate"],
  },
  {
    id: "V003",
    farmer: "David Ouma",
    farm: "Sunrise Farms",
    phone: "+256 700 345 678",
    location: "Mbale",
    idType: "Passport",
    idNumber: "PP4567890",
    status: "rejected",
    submitted: "2024-10-12",
    documents: ["Passport", "Farm Photo"],
  },
];

const farmCertifications = [
  {
    id: "C001",
    farm: "Mukasa Farm",
    farmer: "John Mukasa",
    certType: "Organic Certification",
    issuer: "Uganda Organic Certification",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    status: "active",
  },
  {
    id: "C002",
    farm: "Green Valley Farm",
    farmer: "Mary Nambi",
    certType: "GAP Certification",
    issuer: "Uganda Standards Bureau",
    issueDate: "2023-12-10",
    expiryDate: "2024-12-10",
    status: "expiring-soon",
  },
  {
    id: "C003",
    farm: "Akello Organic",
    farmer: "Sarah Akello",
    certType: "Organic Certification",
    issuer: "Uganda Organic Certification",
    issueDate: "2024-03-05",
    expiryDate: "2025-03-05",
    status: "active",
  },
];

const productQualityChecks = [
  {
    id: "Q001",
    product: "Organic Maize",
    farmer: "John Mukasa",
    checkType: "Quality Inspection",
    inspector: "Admin Team",
    date: "2024-10-15",
    result: "passed",
    notes: "Product meets quality standards",
  },
  {
    id: "Q002",
    product: "Coffee Beans",
    farmer: "David Ouma",
    checkType: "Quality Inspection",
    inspector: "Admin Team",
    date: "2024-10-14",
    result: "pending",
    notes: "Awaiting lab test results",
  },
  {
    id: "Q003",
    product: "Fresh Cabbage",
    farmer: "Peter Mwesigwa",
    checkType: "Quality Inspection",
    inspector: "Admin Team",
    date: "2024-10-13",
    result: "failed",
    notes: "Does not meet minimum grade requirements",
  },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1 text-xl font-semibold">
          Verification & Compliance
        </h2>
        <p className="text-gray-500">
          Manage farmer verification, certifications, and quality control
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Pending Verifications",
            count: "23",
            badge: "Needs review",
            color: "yellow",
            icon: Clock,
          },
          {
            title: "Verified Farmers",
            count: "7,847",
            badge: "Active",
            color: "green",
            icon: CheckCircle,
          },
          {
            title: "Active Certifications",
            count: "3,247",
            badge: "Valid",
            color: "blue",
            icon: Award,
          },
          {
            title: "Quality Alerts",
            count: "12",
            badge: "Action needed",
            color: "red",
            icon: AlertTriangle,
          },
        ].map((card, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                  <h3 className="text-gray-900 mb-2 text-lg font-semibold">{card.count}</h3>
                  <Badge className={`bg-${card.color}-100 text-${card.color}-700`}>
                    {card.badge}
                  </Badge>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${card.color}-100`}
                >
                  <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <Tabs defaultValue="verifications" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="verifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500"
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Farmer ID Verification
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500"
              >
                <Award className="w-4 h-4 mr-2" />
                Farm Certifications
              </TabsTrigger>
              <TabsTrigger
                value="quality"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Product Quality
              </TabsTrigger>
            </TabsList>

            {/* Verification Tab */}
            <TabsContent value="verifications" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Verification ID</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Farm Name</TableHead>
                    <TableHead>ID Type</TableHead>
                    <TableHead>ID Number</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmerVerifications.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>{v.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{v.farmer}</p>
                          <p className="text-xs text-gray-500">{v.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{v.farm}</TableCell>
                      <TableCell>{v.idType}</TableCell>
                      <TableCell className="text-gray-500">{v.idNumber}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{v.documents.length} files</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            v.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : v.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {v.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{v.submitted}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {v.status === "pending" ? (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Certifications */}
            <TabsContent value="certifications" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cert ID</TableHead>
                    <TableHead>Farm Name</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Certification Type</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmCertifications.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>{cert.id}</TableCell>
                      <TableCell>{cert.farm}</TableCell>
                      <TableCell>{cert.farmer}</TableCell>
                      <TableCell>{cert.certType}</TableCell>
                      <TableCell>{cert.issuer}</TableCell>
                      <TableCell>{cert.issueDate}</TableCell>
                      <TableCell>{cert.expiryDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            cert.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {cert.status === "expiring-soon"
                            ? "Expiring Soon"
                            : cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Quality */}
            <TabsContent value="quality" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Check ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Check Type</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productQualityChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell>{check.id}</TableCell>
                      <TableCell>{check.product}</TableCell>
                      <TableCell>{check.farmer}</TableCell>
                      <TableCell>{check.checkType}</TableCell>
                      <TableCell>{check.inspector}</TableCell>
                      <TableCell>{check.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            check.result === "passed"
                              ? "bg-green-100 text-green-700"
                              : check.result === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {check.result}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 truncate">
                        {check.notes}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Report
                        </Button>
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
