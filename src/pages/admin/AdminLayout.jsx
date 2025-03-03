import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main main className="flex-1 overflow-x-hidden overflow-y-auto p-2">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
