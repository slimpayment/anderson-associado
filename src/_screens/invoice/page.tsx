
import { ListCustomers } from "@/components/_customers/listcustomer";

import { AppSidebar } from "@/components/app-sidebar"
import { HeaderDashboard } from "@/components/dashboard/header"
import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"


import {
  Clock9,
  Copy,
  CheckCircle2,
  Mail,
  Printer,
  AlertCircle,
  Hourglass,
  HourglassIcon,
  User,
  Receipt,
  Handshake,
  User2,
  FileText,
  Check,
  Pencil,
  Ban,
  History,
  Eye,
  
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const listInvoice = [
  {
    id:'f901a377-4ee2-4c59-b219-6a25d2bfdd3a' ,
    customer_name : "Cliente 01",
    numero_fatura: "35.872",
    valor_fatura: "70.00",
    description: "Descrição XYZ",
    data_vencimento: "26/06/2025",
    forma_pagamento : 'CARD_CREDIT' ,
    status: 'vencido'
  },
  {
    id:'f102ba3d-dd79-4933-a849-7582ead725bc' ,
    customer_name : "Cliente 02",
    numero_fatura: "35.873",
    valor_fatura: "350.00",
    description: "Descrição XYZ",
    data_vencimento: "26/06/2025",
    forma_pagamento : 'PIX' ,
    status: 'pendente'
  },
  {
    id:'f102ba3d-dd79-4933-a849-7582ead725bc' ,
    customer_name : "Cliente 03",
    numero_fatura: "35.873",
    valor_fatura: "350.00",
    description: "Descrição XYZ",
    data_vencimento: "26/06/2025",
    forma_pagamento : 'PIX' ,
    status: 'pago'
  }
]


export default function InvoiceHome(){
    return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <HeaderDashboard />
                    {/* <div className="font-bold pl-4 mt-0">
                        <span className="text-[22px]">Meus Clientes</span>
                    </div> */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">
                        {/* Tabela com faturas */}
                        <div className="basis-full md:basis-4/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
                            <h3 className="text-lg font-semibold mb-4">Faturas</h3>

                            <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader className="bg-muted rounded-md">
                                <TableRow>
                                    <TableHead className="font-semibold text-sm">Cliente</TableHead>
                                    <TableHead className="font-semibold text-sm">Nº Fatura</TableHead>
                                    <TableHead className="font-semibold text-sm">Valor</TableHead>
                                    <TableHead className="font-semibold text-sm">Descrição</TableHead>
                                    <TableHead className="font-semibold text-sm">Forma de Pagamento</TableHead>
                                    <TableHead className="font-semibold text-sm">Data Vencimento</TableHead>
                                    <TableHead className="font-semibold text-sm text-left">Ação</TableHead>
                                </TableRow>
                                </TableHeader>

                                <TableBody>
                                {listInvoice.map((proposta) => (
                                    <TableRow key={proposta.id}>
                                        <TableCell className="text-blue-500 font-semibold">{proposta.customer_name}</TableCell>

                                        <TableCell className="flex items-center gap-2">
                                            <span className="font-medium">{ proposta.numero_fatura }</span>
                                        </TableCell>

                                        <TableCell className="">R$ {proposta.valor_fatura}</TableCell>

                                        <TableCell className="">{proposta.description}</TableCell>

                                        <TableCell className="">{proposta.forma_pagamento}</TableCell>

                                        <TableCell className="">
                                            {proposta.data_vencimento}
                                            <TooltipProvider>
                                            { 
                                            proposta.status === "vencido" ? (
                                                <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="inline-block">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        disabled
                                                        className="opacity-50 cursor-not-allowed pointer-events-none"
                                                    >
                                                      <span className="w-2 h-2 bg-yellow-700 rounded-full"></span>

                                                    </Button>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Fatura em Atraso.</p>
                                                </TooltipContent>
                                                </Tooltip>
                                            ) :
                                            proposta.status === "pago" ? (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                        </Button>
                                                    </TooltipTrigger>

                                                    <TooltipContent>
                                                        <p>Recebida Paga</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ) : proposta.status === "pendente" ? (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                      <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                                                        </Button>
                                                    </TooltipTrigger>

                                                    <TooltipContent>
                                                        <p>Fatura Pendente</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ) :
                                            null
                                            
                                            }
                                            
                                            </TooltipProvider>







                                        </TableCell>




                                        <TableCell className="text-left">

                                            <Button size="icon" variant="ghost">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger> <Eye className="w-4 h-4" /> </TooltipTrigger>
                                                        <TooltipContent>
                                                        <p>Visualizar Fatura</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Button>

                                            <Button size="icon" variant="ghost">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger> <Pencil className="w-4 h-4 text-blue-400" /> </TooltipTrigger>
                                                            <TooltipContent>
                                                            <p>Atualizar Proposta</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                            </Button>


                                            <TooltipProvider>
                                                {
                                                    proposta.forma_pagamento === "CARD_CREDIT" ? (
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="inline-block">
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                disabled
                                                                className="opacity-50 cursor-not-allowed pointer-events-none"
                                                            >
                                                                <Printer className="w-4 h-4" />
                                                            </Button>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Somente é possível imprimir quando a forma de pagamento for Boleto Bancário.</p>
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="icon" variant="ghost">
                                                            <Printer className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Imprimir Carnê</p>
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    )
                                                }

                                            </TooltipProvider>

                                        </TableCell>

                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            
                            </div>

                        </div>
                    </div>













                </SidebarInset>
            </SidebarProvider>

    )
}