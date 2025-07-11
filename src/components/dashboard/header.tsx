"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Bell, BellRing, Check, CircleUser, Code, LogOut, Moon,
  Settings, User } from "lucide-react";
import { AccountBalance } from "./AccountBalance";





export function HeaderDashboard (){
    return (
      <>
        <header className="flex  shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {/* Lado esquerdo */}
          <div className="flex items-center gap-0 px-0">
            <SidebarTrigger className="-ml-1" />
            {/* <AccountBalance/> */}
          </div>


          {/* Lado direito */}
          <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-muted">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://atlas.asaas.com/assets/images/user-icon.svg" alt="Avatar" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            </div>
                          </DropdownMenuTrigger>
            
                          <DropdownMenuContent align="end" className="w-80 py-3">
                            <DropdownMenuItem><CircleUser className="w-4 h-4 mr-2" />Minha Conta</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><User className="w-4 h-4 mr-2" />Perfil</DropdownMenuItem>
                            <DropdownMenuItem><Settings className="w-4 h-4 mr-2" />Configurações</DropdownMenuItem>
                            <DropdownMenuItem><Bell className="w-4 h-4 mr-2" />Central de Notificações</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Code className="w-4 h-4 mr-2" />Integrações</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive"><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
          </div>






        </header>

          <div className="flex items-center gap-2 px-8 py-2">
          {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb> */}
        </div>

      
    </>
    )
}


