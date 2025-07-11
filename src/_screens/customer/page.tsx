
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { startLoading, stopLoading } from '@/lib/nprogress'

import { ListCustomers } from "@/components/_customers/listcustomer";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderDashboard } from "@/components/dashboard/header";
import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from 'sonner';


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
  FilePlus,
  FilePlus2,
  Eye,
  EyeOff,
  TrendingUpIcon,
  FilePlus2Icon,
  RefreshCcw,
  Ban
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionCards } from '@/components/section-cards';
import { Badge } from '@/components/ui/badge';


import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { importCustomer,ListCustomer } from '@/lib/api';



type Customer = {
  id: string;
  name: string;
};

interface DetailsProps {
  params: Promise<{ idcustomer: string; name : string;  }>;
}






export default function CustomerHome( ){
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [idAsaas, setIdAsaas] = useState("");
  const [datalistCustomer, setdatalistCustomer] = useState<Customer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  const [selectedId, setSelectedId] = useState(null)

//deleta cliente
const handleDelete = async () => {
  console.log('########################')
  console.log('Deletando cliente')
  console.log('########################')
}










const updateListCustomer = async () => {
  try {
    setLoading(true);
    const response = await ListCustomer();

    if(response.event === 'CUSTOMER_LIST_FAILED'){
      toast.info('Falha ao listar clientes!');
    }

    if(response.event === 'CUSTOMER_LIST_SUCCESS'){
      toast.success('Lista de clientes atualizada!');
      setdatalistCustomer(response.data);
    }

  } catch (error: any) {
    toast.error('Erro ao atualizar clientes');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  updateListCustomer();
}, []);







const handleImportCustomer = async () => {
  try {
    setLoading(true);


    
    const data = await importCustomer(idAsaas);
    let responseData = data;




    if(responseData.event ==='CUSTOMER_CREATED'){
      toast.success(responseData.message || 'Cliente importado com sucesso!');
      setOpenDialog(false); // ✅ Fecha o Dialog
      updateListCustomer(); // ✅ Atualiza a lista após importar
    }
    if(responseData.event ==='CUSTOMER_DUPLICATE'){
      toast.warning(responseData.message || 'Cliente ja tem cadastro!');
      //setOpenDialog(false); // ✅ Fecha o Dialog
    }
    if(responseData.event ==='CUSTOMER_FAILED'){
      toast.error(responseData.message || 'Cliente ja tem cadastro!');
      //setOpenDialog(false); // ✅ Fecha o Dialog
    }

    setIdAsaas("");
  } catch (error: any) {
    toast.error(error);

  } finally {
    setLoading(false);
  }
};

    return (
            <SidebarProvider>
                <AppSidebar />
                
                <SidebarInset>
                    
                    <HeaderDashboard />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-1">

                    <div className="flex-1 p-4">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                            <CardDescription>Clientes Cadastrados</CardDescription>
                            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                              {datalistCustomer.length}
                            </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">
                        {/* Tabela com faturas */}
                        <div className="basis-full md:basis-4/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Meus Clientes</h3>

                                <div className="flex gap-2">
                                  {/* Botão Atualizar Lista */}
                                  <Button onClick={updateListCustomer} disabled={loading}>
                                    <RefreshCcw className="w-4 h-4 sm:hidden" />
                                    <span className="hidden sm:inline">Atualizar Lista</span>
                                  </Button>

                                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                    <DialogTrigger asChild>
                                              {/* <Button>Importar Cliente</Button> */}

                                        <Button >
                                          <FilePlus2Icon className="w-4 h-4 sm:hidden" /> 
                                          <span className="hidden sm:inline">
                                            Importar Cliente
                                          </span>
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[500px]">
                                      <DialogHeader>
                                        <DialogTitle>Importar Cliente</DialogTitle>
                                        <DialogDescription>
                                          Informe o ID do cliente no Asaas para importar.
                                        </DialogDescription>
                                      </DialogHeader>

                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="id_asaas" className="text-right">
                                            ID Asaas 
                                          </Label>
                                          <Input
                                            id="id_asaas"
                                            placeholder="Digite o ID do cliente"
                                            required= {true}
                                            value={idAsaas}
                                            onChange={(e) => setIdAsaas(e.target.value)}
                                            className="col-span-3"
                                          />
                                        </div>
                                      </div>

                                      <DialogFooter>
                                        <Button onClick={handleImportCustomer} disabled={loading}>
                                          {loading ? "Importando..." : "Importar"}
                                        </Button>

                                      </DialogFooter>
                                    </DialogContent>

                                  </Dialog>
                                </div>




                            </div>

                            <div className="overflow-x-auto w-full">
                              <Table>
                                  <TableHeader className="bg-muted rounded-md">
                                  <TableRow>
                                      <TableHead className="font-semibold text-sm">Cliente</TableHead>
                                      <TableHead className="font-semibold text-sm text-left">Ação</TableHead>
                                  </TableRow>
                                  </TableHeader>

                                  <TableBody>
                                  {datalistCustomer.map(( dataCustomer ) => (
                                      <TableRow key={dataCustomer.id}>

                                      <TableCell className="flex items-center gap-2">

                                      <span className="font-medium">{dataCustomer.name}</span>



                                      </TableCell>


                                      <TableCell className="text-left">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button size="icon" variant="ghost" onClick={() => router.push(`/customer/view/${dataCustomer.id}`)}>
                                                <Eye className="w-4 h-4" />
                                              </Button>

{/* 
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              onClick={() => {
                                                startLoading()
                                                router.push(`/customer/view/${dataCustomer.id}`)
                                              }}
                                            >
                                              <Eye className="w-4 h-4" />
                                            </Button> */}






                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Ver Detalhes</p>
                                            </TooltipContent>
                                          </Tooltip>

                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button size="icon" variant="ghost" onClick={() => setSelectedId(null)}>
                                                <Ban className="w-4 h-4" />
                                              </Button>

{/* 
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              onClick={() => {
                                                startLoading()
                                                router.push(`/customer/view/${dataCustomer.id}`)
                                              }}
                                            >
                                              <Eye className="w-4 h-4" />
                                            </Button> */}






                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Ver Detalhes</p>
                                            </TooltipContent>
                                          </Tooltip>






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