"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

import { AppSidebar } from "@/components/app-sidebar";
import { BodyPageDefault } from "@/components/_screen_default/_body_page_default";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";



import {
  Clock9,
  Copy,
  CheckCircle2,
  Mail,
  Printer,
  AlertCircle,
  Hourglass,
  HourglassIcon,
  Ban,
  Eye,
  BanIcon,
  RefreshCcw
} from "lucide-react";

import { ChartContainer, ChartConfig } from "@/components/ui/chart";

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


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

import { HeaderDashboard } from "@/components/dashboard/header";
import { toast } from 'sonner';


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const LancamentoExterno = [
  {
    id: "INV_0001",
    associado: "Fulano de Talz",
    dataLancamento: "26/06/2025",
    categoria:"Categoria 1",
    atividade:"Atividade XYZ",
    valor: "250.00",
    status: 'pendente'
  },
]

const statusIcons = {
  pendente: {
    icon: <Clock9 className="w-4 h-4" />,
    bgColor: "bg-orange-500",
  },
  warning: {
    icon: <AlertCircle className="w-4 h-4" />,
    bgColor: "bg-yellow-500",
  },
  pago: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    bgColor: "bg-emerald-600",
  },
}






export default function Dashboard() {
    const router = useRouter()

    const refreshlancamentosPendentes = async () => {
      toast.info('Função em desenvolvimento ...')
  };




useEffect(() => {
  refreshlancamentosPendentes();
}, []);



  return (
    <SidebarProvider>
      <AppSidebar />
      <BodyPageDefault>
        <HeaderDashboard/>
        <div className="font-bold pl-4 mt-0">
          <span className="text-[22px]">Olá,</span><span className="p-1 text-[20px]">Associado</span>
        </div>





        <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">

          <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
          </div>





          {/* Tabela com faturas */}
          <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold mb-4">Lançamentos Pendentes</h3>

            <div className="flex gap-2">
               <Button onClick={refreshlancamentosPendentes} >
                  <RefreshCcw className="w-4 h-4" />
                </Button>
            </div>

            </div>









            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader className="bg-muted rounded-md">
                  <TableRow>
                    <TableHead className="font-semibold text-sm">Associado</TableHead>
                    <TableHead className="font-semibold text-sm">Data</TableHead>
                    <TableHead className="font-semibold text-sm">Categoria</TableHead>
                    <TableHead className="font-semibold text-sm">Atividade</TableHead>
                    <TableHead className="font-semibold text-sm">Valor</TableHead>
                    <TableHead className="font-semibold text-sm text-left">Ação</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {LancamentoExterno.map((datalancamento) => (
                    <TableRow key={datalancamento.id}>
                      <TableCell className="font-medium">{datalancamento.associado}</TableCell>

                      <TableCell>{datalancamento.dataLancamento}</TableCell>

                      <TableCell>{datalancamento.categoria}</TableCell>
                      <TableCell>{datalancamento.atividade}</TableCell>
                      <TableCell className="font-bold">R$ {Number(datalancamento.valor).toFixed(2)}</TableCell>

                      <TableCell className="text-left">

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => router.push(`/associado/view/`)}
                        >

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger> <CheckCircle2 className="w-4 h-4 text-green-600" /> </TooltipTrigger>
                                <TooltipContent>
                                <p>Aprovar Lancamento</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => router.push(`/associado/view/`)}
                        >

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger> <BanIcon className="w-4 h-4 text-red-600" /> </TooltipTrigger>
                                <TooltipContent>
                                <p>Recusar Lancamento</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </Button>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
            </div>

          </div>
        </div>

      </BodyPageDefault>
    </SidebarProvider>
  )
}
