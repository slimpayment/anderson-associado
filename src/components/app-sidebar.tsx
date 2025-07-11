"use client"

import type * as React from "react";

import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  DollarSignIcon,
  Receipt,
  Moon,
  Home
} from "lucide-react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Gerenciar Clientes",
      url: "#",
      icon: UsersIcon,
      color :"",
      data_menu_item : [
        {
          title:"Listar Clientes" ,
          link :"/dashboard/customer"
        },
      ],
     
    },
    {
      title: "Gerenciar Vendedores",
      url: "#",
      icon: UsersIcon,
      color :"",
      data_menu_item : [
        {
          title:"Meus Vendedores" ,
          link :"/menu1"
        },
      ],
     
    },

    {
      title: "Gerenciar Cobranças",
      url: "/",
      icon: Receipt,
      color :"",
      data_menu_item : [
        {
          title:"Avulsas" ,
          link :"/menu1"
        },
        {
          title:"Parcelamentos" ,
          link :"/menu1"
        },
        {
          title:"Assinaturas" ,
          link :"/menu1"
        },

      ],
    },
  ],

  proposta: [
    {
      name: "Nova Proposta",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Contas a Receber",
      url: "#",
      icon: ClipboardListIcon,
    },
  ],





  financeiro: [
    {
      name: "Contas a Pagar",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Contas a Receber",
      url: "#",
      icon: ClipboardListIcon,
    },
  ],

  ferramenta: [
    {
      name: "Consulta Serasa",
      url: "#",
      icon: DatabaseIcon,
    },
  ],




  seller: [
    {
      name: "Gerenciar Vendedores",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Contas a Receber",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Extrato",
      url: "#",
      icon: FileIcon,
    },
  ],






}


let name_bussiness = process.env.NEXT_PUBLIC_COMPANY_NAME



import { NavPrincipal } from "./_nav_menu/nav-principal";
import { NavCustomer } from "./_nav_menu/nav-customer";
import { NavFinanceiro } from "./_nav_menu/nav-financeiro";


import { NavTools } from "./_nav_menu/nav-tools";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="border-r border-gray-200 ">
      
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <DollarSignIcon className="h-5 w-5" />
                <span className="text-base font-semibold">{ name_bussiness }</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
      </SidebarHeader>

      <SidebarContent>
        <NavPrincipal />
        <NavCustomer />
        
        <NavTools />
      </SidebarContent>

    </Sidebar>
  )
}
