import { ChartCandlestick, GalleryVerticalEnd, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Link } from "@remix-run/react";

import { NavData } from "~/lib/data/nav";
import NavUser from "./navUser";
import { ComponentProps } from "react";
import { Button } from "./ui/button";
import Help from "./Help";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      {...props}
      className="bg-gray-200 shadow-xl shadow-gray-400 dark:bg-black dark:shadow-gray-700"
      collapsible="icon"
      variant="floating"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" color="blue" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  The Flow
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Button>
              <span>
                <Plus />
              </span>
              Add
            </Button>
            {NavData.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </div>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div className="py-3">
        <Help />
      </div>
      <SidebarRail />
      <NavUser />
    </Sidebar>
  );
}
