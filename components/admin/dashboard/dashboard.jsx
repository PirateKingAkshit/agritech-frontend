import { SectionCards } from "@/components/section-cards";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-background border shadow rounded-lg py-6">

        <SectionCards />
        <div className="px-4 lg:px-6">
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
