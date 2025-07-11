"use client"

import { FolderIcon, Home, LayoutDashboardIcon, MoreHorizontalIcon, ShareIcon, type LucideIcon } from "lucide-react"

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



export function NavFinanceiro() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold text-dark">Financeiro</SidebarGroupLabel>

      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/novaproposta">
                <Home />
                <span className="font-bold">Segunda Via</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/novaproposta">
                <Home className=""/>
                <span className="">Meus Splits</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>





    </SidebarGroup>
  )
}
