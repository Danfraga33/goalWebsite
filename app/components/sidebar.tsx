import { useLocation } from "@remix-run/react";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "./mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { ReactNode } from "react";
import NavUser from "./navUser";
import { NavData } from "~/lib/data/nav";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  function refactorLocation(location: string) {
    const locationName = location.slice(1);
    return locationName[0].toUpperCase() + locationName.slice(1).toLowerCase();
  }

  const normalizeUrl = (url: string) => {
    return url.replace(/\/$/, ""); // Remove trailing slash if present
  };

  const findParentNav = (selectedUrl: string) => {
    const normalizedSelectedUrl = normalizeUrl(selectedUrl);

    for (const navItem of NavData.navMain) {
      if (normalizeUrl(navItem.url) === normalizedSelectedUrl) {
        return navItem.title;
      }

      if (navItem.items) {
        for (const item of navItem.items) {
          if (normalizeUrl(item.url) === normalizedSelectedUrl) {
            return navItem.title;
          }
        }
      }
    }

    return "NOT FOUND" ?? "Dashboard";
  };
  const parentLocation = findParentNav(location.pathname);
  const childLocation = refactorLocation(location.pathname);
  console.log(findParentNav(location.pathname));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{parentLocation}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{childLocation}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Sidebar;
