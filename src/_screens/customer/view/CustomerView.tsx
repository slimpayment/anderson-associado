'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'

import { AppSidebar } from '@/components/app-sidebar';
import { HeaderDashboard } from '@/components/dashboard/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

import {
  ArrowDown,
  BadgeCheckIcon ,
  ChevronDown,
  CircleDollarSign ,
  Eye ,
  FilePlus2Icon ,
  Import,
  ImportIcon,
  Loader2,
  RefreshCcw ,
  Wrench
} from 'lucide-react';

import {
  Tooltip ,
  TooltipContent ,
  TooltipProvider ,
  TooltipTrigger ,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

import { toast } from 'sonner';



import {
  Dialog,
  DialogTrigger ,
  DialogContent ,
  DialogHeader ,
  DialogTitle ,
  DialogDescription ,
  DialogFooter ,
} from "@/components/ui/dialog";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';



import { importAssinatura, SyncListAssinaturaCustomer } from '@/lib/api/_assinatura';
import { importCustomer,ListCustomer } from '@/lib/api/_customer';
import { ListAssinaturaCustomer} from '@/lib/api/_assinatura'
import { ListParcelamentoCustomer, SyncListParcelamentosCustomer} from '@/lib/api/_parcelamento'


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"




interface Props {
  idcustomer: string;
  name: string;
}
type Customer = {
  id: string;
  name: string;
};
type Assinatura = {
  id: string;
  status_assinatura: string;
  ciclo_assinatura: string;
  value_assinatura: number;
  description: string;
  forma_pagamento: string;
  status_split: string;
  
};


type Parcelamento = {
  id: string;
  status_assinatura: string;
  ciclo_assinatura: string;
  valor_parcela: string;
  qtdParcelas : number;
  valor_total : number;
  description: string;
  forma_pagamento: string;
  status_split: string;
  
};
type Avulso = {
  id: string;
  status_assinatura: string;
  ciclo_assinatura: string;
  value_assinatura: number;
  description: string;
  forma_pagamento: string;
  status_split: string;
  
};


export default function CustomerView({ idcustomer,name }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [idassinatura, setidassinatura] = useState("");
  const [datalistCustomer, setdatalistCustomer] = useState<Customer[]>([]);
  const [datalistAssinatura, setdatalistAssinatura] = useState<Assinatura[]>([]);
  const [datalistParcelamento, setdatalistParcelamento] = useState<Parcelamento[]>([]);
  const [datalistAvulso, setdatalistAvulso] = useState<Avulso[]>([]);
  
  const [open, setOpen] = useState(true)

  const [openCollapseAssinatura, setOpenCollapseAssinatura] = useState(true)
  const [openCollapseParcelamento, setOpenCollapseParcelamento] = useState(true)
  const [openCollapseAvulsa, setopenCollapseAvulsa] = useState(true)

const updateListCustomer = async () => {
  try {
    setLoading(true);
    const response = await ListCustomer();
    setdatalistCustomer(response.data);
    toast.success('Lista de clientes atualizada!');

  } catch (error: any) {
      toast.error('Erro ao atualizar clientes');
  } finally {
    setLoading(false);
  }
};



const updateListAssinatura = async () => {
  try {
    setLoading(true);
    const responseListAssinatura = await ListAssinaturaCustomer(idcustomer);
    setdatalistAssinatura(responseListAssinatura.data);
    toast.success('Assinaturas atualizadas!');

  } catch (error) {
    toast.error('Erro ao atualizar Assinaturas');
  } finally {
    setLoading(false);
  }  

};





const listParcelamento = async () => {
    setLoading(true);
    const responseListParcelamento = await ListParcelamentoCustomer(idcustomer);
    console.log('########################## responseListParcelamento event')
    console.log( responseListParcelamento.event )
    console.log('########################## responseListParcelamento event')

  if(responseListParcelamento.event === 'LIST_PARCELAMENTOS_SUCCESS'){    
    setdatalistParcelamento(responseListParcelamento.data);
    toast.success(responseListParcelamento.message);
  }





};


// Sync Assinatura
const syncListAssinatura = async () => {
toast.warning('Sincronizando Assinaturas')
  const response = await SyncListAssinaturaCustomer(idcustomer);
  let responseEvent = response.event
  if(responseEvent  === 'SYNC_LIST_ASSINATURA_SUCCESS'){
    const responseListAssinatura = await ListAssinaturaCustomer(idcustomer);
    setdatalistAssinatura(responseListAssinatura.data);    
    toast.success('Assinaturas sincronizadas com sucesso!')
  }

  if(responseEvent  === 'SYNC_LIST_ASSINATURA_FAILED'){
    toast.warning('Falha ao sincronizar Assinaturas!')
  }




};


const syncListParcelamentos = async () => {
toast.warning('Sincronizando Parcelamentos')
  const response = await SyncListParcelamentosCustomer(idcustomer);
  let responseEvent = response.event

  console.log('-------------------- sync parcelamentos')
    console.log(responseEvent)
    console.log('**')
    console.log(response)
  console.log('-------------------- sync parcelamentos')




  if(responseEvent  === 'CUSTOMER_PARCELAMENTOS_LIST_SUCCESS'){
    const responseListAssinatura = await ListParcelamentoCustomer(idcustomer);
    setdatalistParcelamento(responseListAssinatura.data);    
    toast.success('Parcelamentos sincronizadas com sucesso!')
  }

  if(responseEvent  === 'CUSTOMER_PARCELAMENTOS_LIST_FAILED'){
    toast.warning('Falha ao sincronizar Parcelamentos!')
  }




};







useEffect(() => {
  updateListAssinatura();
  listParcelamento();
}, []);




 const handleImportAssinatura = async () => {
    if (!idassinatura.trim()) {
      toast.warning("ID da assinatura é obrigatório!");
      return;
    }
    setLoading(true);

    try {
      const response = await importAssinatura(idassinatura);
      if( response.event === 'ASSINATURA_CREATED'){

        toast.success(response.message );
        setidassinatura("");
        setOpenDialog(false); // Fecha o dialog
        updateListAssinatura();
      }

      if( response.event === 'ASSINATURA_DUPLICATE'){
        toast.info(response.message );
        setidassinatura("");
      }

      if( response.event === 'ASSINATURA_FAILED'){
        toast.info(response.message );
        setidassinatura("");
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
        <div className="font-bold pl-4 mt-0">
          <span className="p-1 text-[20px]">{ name }</span>
        </div>




        {/* colappse #01 - Assinaturas */}
        <Collapsible open={openCollapseAssinatura} onOpenChange={setOpenCollapseAssinatura}>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4 mt-4">
            <div className="basis-full w-full max-w-full border border-gray-200 shadow-sm p-4">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                {/* Título com botão colapsável */}
                <CollapsibleTrigger asChild>
                  <button
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setOpenCollapseAssinatura(!open)}
                  >
                    Assinaturas
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>

                {/* Botões de ação */}
                <div className="flex gap-2">
                  {/* <Button onClick={updateListAssinatura} disabled={loading}>
                    <RefreshCcw className="w-4 h-4" />
                  </Button> */}

                  {/* Dialog de Importação */}
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button disabled={loading}>
                        <ImportIcon className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Importar Parcelamento</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="nome">ID Assinatura</Label>
                          <Input
                            id="nome"
                            placeholder="Digite o ID Da Assinatura"
                            value={idassinatura}
                            onChange={(e) => setidassinatura(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleImportAssinatura} disabled={loading}>
                          {loading ? "Importando..." : "Importar Assinatura"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={syncListAssinatura} disabled={loading} className="bg-blue-600">
                    <RefreshCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Conteúdo que colapsa */}
              <CollapsibleContent>
                <div className="overflow-x-auto">
                  {/* Aqui entra sua TABELA ou qualquer outro conteúdo */}
              <Table>
                <TableHeader className="bg-muted rounded-md">
                  <TableRow>
                    <TableHead>Situação</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Split</TableHead>
                    <TableHead colSpan={2}>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {datalistAssinatura.map(( dataAssinatura ) => (
                    <TableRow key={dataAssinatura.id}>
                    <TableCell ><span className="font-medium">{dataAssinatura.status_assinatura}</span></TableCell>
                    <TableCell ><span className="font-medium text-sm">R$ {dataAssinatura.value_assinatura} / </span><span className='text-[10px] text-blue-700'>{dataAssinatura.ciclo_assinatura}</span></TableCell>
                    <TableCell ><span className="font-medium">{dataAssinatura.description}</span></TableCell>
                    <TableCell ><span className="font-medium">{dataAssinatura.forma_pagamento}</span></TableCell>

                    <TableCell className="text-xs">
                      {dataAssinatura.status_split ? (
                        <Badge>
                          <BadgeCheckIcon className="mr-1 h-4 w-4" />
                          Configurado
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Wrench className="mr-1 h-4 w-4" />
                          Não Configurado
                        </Badge>
                      )}
                    </TableCell>



                           <TableCell className="text-left">

                            {/* <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/assinatura/payments/list/${dataAssinatura.id}`)}>
                                    <CircleDollarSign className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Visualizar Faturas</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider> */}

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/assinatura/split/${dataAssinatura.id}`)}>
                                    <Wrench className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Configurar Split</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>


              </Table>
                </div>
              </CollapsibleContent>

            </div>
          </div>
        </Collapsible>


        {/* colappse #02 - Parcelamentos */}
        <Collapsible open={openCollapseParcelamento} onOpenChange={setOpenCollapseParcelamento}>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4 mt-4">
            <div className="basis-full w-full max-w-full border border-gray-200 shadow-sm p-4">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                {/* Título com botão colapsável */}
                <CollapsibleTrigger asChild>
                  <button
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setOpenCollapseParcelamento(!open)}
                  >
                    Parcelamentos
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>

                {/* Botões de ação */}
                <div className="flex gap-2">
                  {/* <Button onClick={updateListAssinatura} disabled={loading}>
                    <RefreshCcw className="w-4 h-4" />
                  </Button> */}

                  {/* Dialog de Importação */}
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button disabled={loading}>
                        <ImportIcon className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Importar Parcelamento</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="nome">ID Assinatura</Label>
                          <Input
                            id="nome"
                            placeholder="Digite o ID Da Assinatura"
                            value={idassinatura}
                            onChange={(e) => setidassinatura(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleImportAssinatura} disabled={loading}>
                          {loading ? "Importando..." : "Importar Assinatura"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={syncListParcelamentos} disabled={loading} className="bg-blue-600">
                    <RefreshCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Conteúdo que colapsa */}
              <CollapsibleContent>
                <div className="overflow-x-auto">
                  {/* Aqui entra sua TABELA ou qualquer outro conteúdo */}
              <Table>
                <TableHeader className="bg-muted rounded-md">
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor Parcela</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Split</TableHead>
                    <TableHead colSpan={2}>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {datalistParcelamento.map(( dataParcelamento ) => (
                    <TableRow key={dataParcelamento.id}>
                    <TableCell ><span className="font-medium">{dataParcelamento.description}</span></TableCell>
                    <TableCell ><span className="font-medium text-sm"><span>{dataParcelamento.qtdParcelas}x</span> R$ {parseFloat(dataParcelamento.valor_parcela).toFixed(2)}</span></TableCell>
                    <TableCell ><span className="font-medium">{dataParcelamento.forma_pagamento}</span></TableCell>
                    <TableCell ><span className="font-medium text-sm">R$ {dataParcelamento.valor_total}</span></TableCell>

                    <TableCell className="text-xs">
                      {dataParcelamento.status_split ? (
                        <Badge>
                          <BadgeCheckIcon className="mr-1 h-4 w-4" />
                          Configurado
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Wrench className="mr-1 h-4 w-4" />
                          Não Configurado
                        </Badge>
                      )}
                    </TableCell>



                           <TableCell className="text-left">

                            {/* <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/parcelamento/payments/list/${dataParcelamento.id}`)}>
                                    <CircleDollarSign className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Visualizar Faturas</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider> */}

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/parcelamento/split/${dataParcelamento.id}`)}>
                                    <Wrench className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Configurar Split</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>


              </Table>
                </div>
              </CollapsibleContent>

            </div>
          </div>
        </Collapsible>



        {/* colappse #03 - Faturas Avulsas */}
        <Collapsible open={openCollapseAvulsa} onOpenChange={setopenCollapseAvulsa}>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4 mt-4">
            <div className="basis-full w-full max-w-full border border-gray-200 shadow-sm p-4">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                {/* Título com botão colapsável */}
                <CollapsibleTrigger asChild>
                  <button
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setopenCollapseAvulsa(!open)}
                  >
                    Avulsas
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>

                {/* Botões de ação */}
                <div className="flex gap-2">
                  <Button onClick={updateListAssinatura} disabled={loading}>
                    <RefreshCcw className="w-4 h-4" />
                  </Button>

                  {/* Dialog de Importação */}
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button disabled={loading}>
                        <ImportIcon className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Importar Parcelamento</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="nome">ID Assinatura</Label>
                          <Input
                            id="nome"
                            placeholder="Digite o ID Da Assinatura"
                            value={idassinatura}
                            onChange={(e) => setidassinatura(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleImportAssinatura} disabled={loading}>
                          {loading ? "Importando..." : "Importar Assinatura"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={syncListAssinatura} disabled={loading} className="bg-blue-600">
                    <RefreshCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Conteúdo que colapsa */}
              <CollapsibleContent>
                <div className="overflow-x-auto">
                  {/* Aqui entra sua TABELA ou qualquer outro conteúdo */}
              <Table>
                <TableHeader className="bg-muted rounded-md">
                  <TableRow>
                    <TableHead>Situação</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Split</TableHead>
                    <TableHead colSpan={2}>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {datalistAvulso.map(( dataParcelamento ) => (
                    <TableRow key={dataParcelamento.id}>
                    <TableCell ><span className="font-medium">{dataParcelamento.status_assinatura}</span></TableCell>
                    <TableCell ><span className="font-medium text-sm">R$ {dataParcelamento.value_assinatura} / </span><span className='text-[10px] text-blue-700'>{dataParcelamento.ciclo_assinatura}</span></TableCell>
                    <TableCell ><span className="font-medium">{dataParcelamento.description}</span></TableCell>
                    <TableCell ><span className="font-medium">{dataParcelamento.forma_pagamento}</span></TableCell>

                    <TableCell className="text-xs">
                      {dataParcelamento.status_split ? (
                        <Badge>
                          <BadgeCheckIcon className="mr-1 h-4 w-4" />
                          Configurado
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Wrench className="mr-1 h-4 w-4" />
                          Não Configurado
                        </Badge>
                      )}
                    </TableCell>



                           <TableCell className="text-left">

                            {/* <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/assinatura/payments/list/${dataParcelamento.id}`)}>
                                    <CircleDollarSign className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Visualizar Faturas</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider> */}

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/assinatura/split/${dataParcelamento.id}`)}>
                                    <Wrench className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Configurar Split</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>


              </Table>
                </div>
              </CollapsibleContent>

            </div>
          </div>
        </Collapsible>
      </SidebarInset>
    </SidebarProvider>
  );
}
