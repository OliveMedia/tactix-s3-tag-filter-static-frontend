import React from "react";
import { SideBar } from "../sidebar";
import { Navbar } from "../navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <Navbar />
      <div className="overflow-auto w-full">{children}</div>
    </div>
  );
};

export default Layout;
