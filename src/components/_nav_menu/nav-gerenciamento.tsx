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




export function NaGerenciamento() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="font-bold text-dark">Gerenciar</SidebarGroupLabel>

      <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/gerenciar/categorias">
                <Home/>
                <span className="">Gerenciar Categorias</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/associado/atividades">
                <Home/>
                <span className="">Gerenciar Atividades</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>




      </SidebarMenu>

    </SidebarGroup>
  )
}
