import { ReactNode } from "react";
import Nav from "../components/nav/Nav";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

interface IDashboardLayout {
  children?: ReactNode;
}
export default function Dashboardlayout({ children }: IDashboardLayout) {
  return (
    <div className="w-full h-screen overflow-y-scroll bg-JHC/Light">
      <Nav />
      <Sidebar />
      <div className="w-[calc(100vw-14.8vw)] p-12 ml-[14.8vw] h-full">
        {children || <Outlet />}
      </div>
    </div>
  );
}
