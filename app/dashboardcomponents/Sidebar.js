"use client";

import Link from "next/link";
import Image from "next/image";
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
  { id: "", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "products", label: "Product Management", icon: Package },
  { id: "orders", label: "Orders & Transactions", icon: ShoppingCart },
  { id: "analytics", label: "Farm & Market Analytics", icon: BarChart3 },
  { id: "verification", label: "Verification & Compliance", icon: ShieldCheck },
  { id: "reports", label: "Reports & Export", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings },
];
// { id: "security", label: "Security & Logs", icon: Lock },
  // { id: "messaging", label: "Messaging & Notifications", icon: MessageSquare },
  // { id: "support", label: "Support & Dispute", icon: Headphones },
  // { id: "content", label: "Content Management", icon: FileText },

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

//   if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-30">
      {/* Logo Section */} 
      <div className=" bg-green-700 flex items-center rounded-b-md justify-center h-25">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={60}
              priority
              className="object-contain w-auto h-auto"
            />
       
      </div>

      {/* Menu Section */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
        <div className="space-y-1">
          {menuItems.map(({ id, label, icon: Icon }) => {
           
            const isActive =
              pathname === `/dashboard/${id}` ||
              (pathname === "/dashboard" && id === "");
            return (
              <Link
                key={id}
                href={`/dashboard/${id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${id === "settings" 
                    ? "absolute bottom-2"
                    : "text-gray-600 hover:bg-gray-50"} ${
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

