"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  Headphones,
  Settings,
  FileText,
  FileBarChart,
  Lock,
  Sprout,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "products", label: "Product Management", icon: Package },
  { id: "orders", label: "Orders & Transactions", icon: ShoppingCart },
  { id: "analytics", label: "Farm & Market Analytics", icon: BarChart3 },
  { id: "verification", label: "Verification & Compliance", icon: ShieldCheck },
  { id: "messaging", label: "Messaging & Notifications", icon: MessageSquare },
  { id: "support", label: "Support & Dispute", icon: Headphones },
  { id: "content", label: "Content Management", icon: FileText },
  { id: "reports", label: "Reports & Export", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "security", label: "Security & Logs", icon: Lock },
];

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

//   if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-30">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2ECC71] rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 font-semibold text-lg">
              FarmConnect
            </h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
        <div className="space-y-1">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const isActive =
              pathname === `/dashboard/${id}` ||
              (pathname === "/dashboard" && id === "dashboard");

            return (
              <Link
                key={id}
                href={`/dashboard/${id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#2ECC71] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}



// // app/components/Sidebar.tsx (or move this to wherever you keep components)
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   LayoutDashboard,
//   Users,
//   Package,
//   ShoppingCart,
//   BarChart3,
//   ShieldCheck,
//   MessageSquare,
//   Headphones,
//   Settings,
//   FileText,
//   FileBarChart,
//   Lock,
//   Sprout
// } from 'lucide-react';
// import Image from 'next/image';

// const menuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
//   { id: 'users', label: 'User Management', icon: Users, href: '/dashboard/users' },
//   { id: 'products', label: 'Product Management', icon: Package, href: '/dashboard/products' },
//   { id: 'orders', label: 'Orders & Transactions', icon: ShoppingCart, href: '/dashboard/orders' },
//   { id: 'analytics', label: 'Farm & Market Analytics', icon: BarChart3, href: '/dashboard/analytics' },
//   { id: 'verification', label: 'Verification & Compliance', icon: ShieldCheck, href: '/dashboard/verification' },
//   { id: 'messaging', label: 'Messaging & Notifications', icon: MessageSquare, href: '/dashboard/messaging' },
//   { id: 'support', label: 'Support & Dispute', icon: Headphones, href: '/dashboard/support' },
//   { id: 'content', label: 'Content Management', icon: FileText, href: '/dashboard/content' },
//   { id: 'reports', label: 'Reports & Export', icon: FileBarChart, href: '/dashboard/reports' },
//   { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
//   { id: 'security', label: 'Security & Logs', icon: Lock, href: '/dashboard/security' },
// ];

// // interface SidebarProps {
// //   isOpen: boolean;
// // }

// export default function Sidebar({ isOpen })  {
//   const pathname = usePathname();

//   if (!isOpen) return null;

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-30">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-[#2ECC71] rounded-xl flex items-center justify-center">
//             <Sprout className="w-6 h-6 text-white" />
//           </div>
//           <div>
//              <div className="rounded-md bg-green-700 flex justify-center">
//               <Image
//                 src="/images/logo.png"
//                 alt="Logo"
//                 width={120}
//                 height={60}
//                 priority
//                 className="object-contain w-auto h-auto"
//               />
//             </div>
//             {/* <h1 className="text-gray-900 font-semibold">FarmConnect</h1>
//             <p className="text-xs text-gray-500">Admin Dashboard</p> */}
//           </div>
//         </div>
//       </div>

//       <nav className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
//         <div className="space-y-1">
//           {menuItems.map(({ id, label, icon: Icon, href }) => {
//             const isActive = pathname === href;

//             return (
//               <Link key={id} href={href} passHref>
//                 <div
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
//                     isActive
//                       ? 'bg-[#2ECC71] text-white shadow-md'
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="text-sm">{label}</span>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </nav>
//     </aside>
//   );
// }
