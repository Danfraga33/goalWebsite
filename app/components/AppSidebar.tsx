import { GalleryVerticalEnd } from "lucide-react";

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
import { Link, useLoaderData } from "@remix-run/react";

import { NavData } from "~/lib/data/nav";
import NavUser from "./navUser";
import { ComponentProps } from "react";
import Help from "./Help";
import AddNav from "./AddNav";
// export async function loader() {
//   const navData = await db.navItem.findMany();

//   return json(navData);
// }
export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  // const navData = useLoaderData<typeof loader>();

  return (
    <Sidebar
      {...props}
      className="bg-gray-200 shadow-xl shadow-gray-400 dark:bg-[#171719] dark:shadow-gray-700"
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
          <AddNav />
          <SidebarMenu>
            {NavData.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="font-medium">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </div>
                {item.items?.filter((subItem) => subItem.isActive).length >
                  0 && (
                  <SidebarMenuSub>
                    {item.items
                      .filter((subItem) => subItem.isActive)
                      .map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                          >
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                  </SidebarMenuSub>
                )}
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
