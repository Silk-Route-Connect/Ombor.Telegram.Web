"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { SidebarData } from "@/constants/sidebar-data";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

type SidebarItemType = {
  title: string;
  url: string;
  icon?: React.ElementType;
  subItems?: { title: string; url: string }[];
};

export function AppSidebar() {
  const path = usePathname();
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-4 px-4 py-3">
          <Image src="/logos/logo.png" alt="Logo" width={50} height={50} />
          <Separator orientation="vertical" className="h-10 bg-border" />
          <div className="leading-tight">
            <p className="text-lg font-semibold text-primary">Template</p>
            <p className="text-sm text-muted-foreground">Project Title</p>
          </div>
        </div>
      </SidebarHeader>
      <Separator className="mt-3" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Pages label</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="pr-5">
              {SidebarData?.map((sidebar: SidebarItemType, index: number) => {
                const isSidebarItemActive =
                  sidebar?.url === "/"
                    ? path === "/"
                    : path.startsWith(sidebar?.url || "");

                if (sidebar?.subItems?.length) {
                  const isAnySubActive = sidebar.subItems.some((subItem) =>
                    subItem?.url === "/"
                      ? path === "/"
                      : path.startsWith(subItem?.url || "")
                  );

                  return (
                    <SidebarMenuItem key={index}>
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={
                          isAnySubActive ? sidebar?.title : undefined
                        }
                      >
                        <AccordionItem value={sidebar?.title}>
                          <AccordionTrigger
                            className={`pl-7 mb-2 text-left transition ${
                              isAnySubActive
                                ? "bg-primary/20 font-semibold text-primary"
                                : ""
                            }`}
                          >
                            {sidebar?.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            {sidebar.subItems.map((subItem, subIndex) => {
                              const isSidebarSubItemActive =
                                subItem?.url === "/"
                                  ? path === "/"
                                  : path.startsWith(subItem?.url || "");

                              return (
                                <Link key={subIndex} href={subItem?.url || "#"}>
                                  <Button
                                    onClick={() => toggleSidebar()}
                                    className="mb-2 w-[90%]"
                                    variant={
                                      isSidebarSubItemActive
                                        ? "navActive"
                                        : "nav"
                                    }
                                  >
                                    {sidebar.icon && <sidebar.icon />}
                                    {subItem.title}
                                  </Button>
                                </Link>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={index}>
                    <Link href={sidebar?.url || "#"}>
                      <Button
                        onClick={() => toggleSidebar()}
                        className="mb-2"
                        variant={isSidebarItemActive ? "navActive" : "nav"}
                      >
                        {sidebar.icon && <sidebar.icon />}
                        {sidebar.title}
                      </Button>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
