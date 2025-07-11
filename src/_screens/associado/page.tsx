
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import { ListCustomers } from "@/components/_customers/listcustomer"
import { AppSidebar } from "@/components/app-sidebar"
import { HeaderDashboard } from "@/components/dashboard/header"
import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar"


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
  RefreshCcw
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
import { SectionCards } from '@/components/section-cards'
import { Badge } from '@/components/ui/badge'




import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { importCustomer,ListCustomer } from '@/lib/api';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { novoAssociado, listAssociado } from '@/lib/api/_associado';



type Associados = {
  id_associado: string;
  name: string;
  email: string;
  mobile: string;
};

//export default function AssociadoHome( { idassociado }: { idassociado: string } ){
export default function AssociadoHome( ){


  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [datalistAssociado, setdatalistAssociado] = useState<Associados[]>([]);
  const [totalAssociados, settotalAssociados] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");










  const updateListAssociados = async () => {
    try {
      const responseList = await listAssociado();
      settotalAssociados(responseList.count )

      if( responseList.event === 'ASSOCIADO_LIST_SUCCESS'){
        setLoading(true);
        setdatalistAssociado(responseList.data);
        toast.success('Lista Atualizada com sucesso!');

      }


      
    } catch (error: any) {
      toast.error('Erro ao atualizar clientes');
    } finally {
      setLoading(false);
    }
  };


  const refreshListAssociados = async () => {
    try {
      const responseList = await listAssociado();
      settotalAssociados(responseList.count )

      if( responseList.event === 'ASSOCIADO_LIST_SUCCESS'){
        setLoading(true);
        setdatalistAssociado(responseList.data);
      }


      
    } catch (error: any) {
      toast.error('Erro ao atualizar clientes');
    } finally {
      setLoading(false);
    }
  };




useEffect(() => {
  updateListAssociados();
}, []);




  const handleCadastrarAssociado = async () => {

  let dataInput = [
    { valor: nome, nome:  "Nome do Associado" },
    { valor: email, nome: "E-mail" },
    { valor: mobile, nome: "Celular da Empresa" },
    ];

  const inputBlank = dataInput.find(c => !c.valor);
  if (inputBlank) {
    toast.warning(`${inputBlank.nome} é obrigatório!`);
    return;
  }






    setLoading(true);

    try {
       const response = await novoAssociado({nome, email, mobile});

      if( response.event === "ASSOCIADO_CREATED_SUCCESS"){
        toast.success(response.message);
        setNome("");
        setEmail("");
        setmobile("");
        setOpenDialog(false);
        refreshListAssociados();



      }




    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };








    return (
            <SidebarProvider>
                <AppSidebar />
                
                <SidebarInset>
                    
                    <HeaderDashboard />

                    {/* <div className="font-bold pl-4 mt-0">
                        <span className="text-[22px]">Meus Clientes</span>
                    </div> */}

                {/* <div className="flex flex-col md:flex-row gap-12"> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-1">

                    <div className="flex-1 p-4">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                            <CardDescription>Associados Cadastrados</CardDescription>
                            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                               {totalAssociados}
                            </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                </div>






                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">
                        {/* Tabela com faturas */}
                        <div className="basis-full md:basis-4/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Associados</h3>

                                <div className="flex gap-2">
                                  {/* Botão Atualizar Lista */}
                                  <Button onClick={updateListAssociados} >
                                    <RefreshCcw className="w-4 h-4 sm:hidden" />
                                    <span className="hidden sm:inline">Atualizar</span>
                                  </Button>

                                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                    <DialogTrigger asChild>
                                              {/* <Button>Importar Cliente</Button> */}

                                        <Button >
                                          <FilePlus2Icon className="w-4 h-4 sm:hidden" /> 
                                          <span className="hidden sm:inline">
                                            Novo Associado
                                          </span>
                                        </Button>
                                    </DialogTrigger>

                                      <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                          <DialogTitle>Adicionar Novo Associado</DialogTitle>
                                          <DialogDescription>
                                            Senha Padrão: <span className="font-bold text-red-700">user123</span>
                                          </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-4 py-4">
                                          <div className="flex flex-col gap-2">
                                            <Label htmlFor="nome">Nome</Label>
                                            <Input
                                              id="nome"
                                              placeholder="Nome completo"
                                              value={nome}
                                              onChange={(e) => setNome(e.target.value)}
                                              required
                                            />
                                          </div>

                                          <div className="flex flex-col gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                              id="email"
                                              placeholder="Email de acesso"
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                              required
                                            />
                                          </div>

                                          <div className="flex flex-col gap-2">
                                            <Label htmlFor="email">Celular</Label>
                                            <Input
                                              id="mobile"
                                              placeholder="Celular para contato"
                                              value={mobile}
                                              onChange={(e) => setmobile(e.target.value)}
                                              required
                                            />
                                          </div>


                                        </div>


                                        <DialogFooter>
                                          <Button onClick={handleCadastrarAssociado} disabled={loading}>
                                            {loading ? "Registrando..." : "Registrar Associado"}
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
                                    <TableHead className="font-semibold text-sm">Data Cadastro</TableHead>
                                    <TableHead className="font-semibold text-sm text-left">Ação</TableHead>
                                </TableRow>
                                </TableHeader>

                                <TableBody>
                                {datalistAssociado.map((data) => (
                                    <TableRow key={data.id_associado}>

                                    <TableCell className="flex items-center gap-2">

                                    <span className="font-medium">{data.name}</span>



                                    </TableCell>

                                    <TableCell>{data.email}</TableCell>

                                    <TableCell className="text-left">

                                        <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => router.push(`/associado/view/${data.id_associado}`)}
                                        >

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger> <Eye className="w-4 h-4" /> </TooltipTrigger>
                                                    <TooltipContent>
                                                    <p>Ver Detalhes</p>
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