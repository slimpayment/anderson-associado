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




export function NavAssociados() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold text-dark">Associados</SidebarGroupLabel>

      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/associado/list">
                <Home className=""/>
                <span className="">Gerenciar Associados</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
      </SidebarMenu>

    </SidebarGroup>
  )
}
