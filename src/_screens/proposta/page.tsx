'use client';





import { useRouter } from 'next/navigation';



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
  
} from "lucide-react"

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


const listProposta = [
  {
    id:'6a674743-bd12-4603-9cd3-c11b253dbbed' ,
    numero_proposta: "35.871",
    cliente: "Cliente 1",
    valor: "250.00",
    dataCadastro: "26/06/2025",
    create_adesao : true ,
    create_proposta : true ,
    status: 'cancelado'
  },
  {
    id:'f901a377-4ee2-4c59-b219-6a25d2bfdd3a' ,
    numero_proposta: "35.872",
    cliente: "Cliente 2",
    valor: "70.00",
    dataCadastro: "26/06/2025",
    create_adesao : false ,
    create_proposta : false ,
    status: 'vencido'
  },

  {
    id:'f102ba3d-dd79-4933-a849-7582ead725bc' ,
    numero_proposta: "35.873",
    cliente: "Cliente 3",
    valor: "350.00",
    dataCadastro: "26/06/2025",
    create_adesao : true ,
    create_proposta : false ,
    status: 'pendente'
  },

  {
    id:'f102ba3d-dd79-4933-a849-7582ead725bc' ,
    numero_proposta: "35.873",
    cliente: "Cliente 4",
    valor: "350.00",
    dataCadastro: "26/06/2025",
    create_adesao : false ,
    create_proposta : true ,
    status: 'pago'
  },


]


export default function PropostasHome(){

  const router = useRouter();

  function handleClick() {
    router.push('/invoice/list');
  }





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
                            <h3 className="text-lg font-semibold mb-4">Minhas Propostas</h3>

                            <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader className="bg-muted rounded-md">
                                <TableRow>
                                    <TableHead className="font-semibold text-sm">Nº Proposta</TableHead>
                                    <TableHead className="font-semibold text-sm">Cliente</TableHead>
                                    <TableHead className="font-semibold text-sm">Adesão</TableHead>
                                    <TableHead className="font-semibold text-sm">Assinatura</TableHead>
                                    <TableHead className="font-semibold text-sm text-left">Ação</TableHead>
                                </TableRow>
                                </TableHeader>

                                <TableBody>
                                {listProposta.map((proposta) => (
                                    <TableRow key={proposta.id}>

                                        <TableCell className="flex items-center gap-2">


                                            {
                                                proposta.status === "cancelado" ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                                                </span>
                                                ) :
                                                proposta.status === "pendente" ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                </span>
                                                ) : proposta.status === "vencido" ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                                </span>

                                                
                                                ) : proposta.status === "pago" ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                </span>


                                                
                                                ) : null
                                            }

                                        <span className="font-medium">{proposta.numero_proposta}</span>



                                        </TableCell>

                                        <TableCell className="font-bold">{proposta.cliente}</TableCell>

                                        <TableCell>
                                            {/* Status adesao */}
                                            {
                                                proposta.create_adesao === true ? (
                                                    <Badge className="bg-green-600"><Check />Adesão Criada</Badge>
                                                ) : proposta.create_adesao === false ?(
                                                    <Badge className="bg-blue-600"><Hourglass />Adesão Pendente</Badge>
                                                ): null
                                            }
                                        </TableCell>

                                         <TableCell>
                                            {/* create proposta */}
                                            {
                                                proposta.create_proposta === true ? (
                                                    <Badge className="bg-green-600"><Check />Proposta Criada</Badge>
                                                ) : proposta.create_proposta === false ?(
                                                    <Badge className="bg-blue-600"><Hourglass />Proposta Pendente</Badge>
                                                ): null
                                            }
                                        </TableCell>                                     





                                        <TableCell className="text-left">

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

                                            <Button size="icon" variant="ghost" onClick={handleClick}>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger> <FileText className="w-4 h-4" /> </TooltipTrigger>
                                                        <TooltipContent>
                                                        <p>Ver Faturas</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Button>

                                            <Button size="icon" variant="ghost">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger> <Printer className="w-4 h-4" /> </TooltipTrigger>
                                                        <TooltipContent>
                                                        <p>Imprimir Carnê</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Button>

                                            <Button size="icon" variant="ghost">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger> <Ban className="text-red-700 w-4 h-4" /> </TooltipTrigger>
                                                        <TooltipContent>
                                                        <p>Cancelar Proposta</p>
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













                </SidebarInset>
            </SidebarProvider>

    )
}