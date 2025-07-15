"use client"

import { BookOpen, Home, type LucideIcon } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";




export function NavCasos() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold text-dark">Casos</SidebarGroupLabel>


      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard">
                <Home/>
                <span className="">Menu Ferramenta 01</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

      </SidebarMenu>

    </SidebarGroup>
  )
}
