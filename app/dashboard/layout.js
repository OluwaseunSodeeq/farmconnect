"use client";

import { useState } from "react";
import Wrapper from "../components/Wrapper";
import Sidebar from "../dashboardcomponents/Sidebar";
import { TopNavigation } from "../dashboardcomponents/TopNavigation";
import BackButton from "../components/BackButton";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Wrapper>
      <div className="flex min-h-screen bg-linear-to-tr to-green-100 via-white from-green-50">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Main Content */}
        <div className="flex-1 relative flex flex-col ml-64">
          <TopNavigation toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6">{children}</main>
          <BackButton />
        </div>
      </div>
    </Wrapper>
  );
}
