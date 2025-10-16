"use client";

import { useState } from "react";
import Sidebar from "../dashboardcomponents/Sidebar";
import Wrapper from "../components/Wrapper";
import TopNav  from "../dashboardcomponents/TopNav";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Wrapper>
      <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <TopNav toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </Wrapper>
  );
}
