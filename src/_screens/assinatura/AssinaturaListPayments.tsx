'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'

import { AppSidebar } from '@/components/app-sidebar';
import { HeaderDashboard } from '@/components/dashboard/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

import {
  BadgeCheckIcon ,
  CircleDollarSign ,
  Eye ,
  FilePlus2Icon ,
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

import { importFatura } from '@/lib/api/_fatura';
import { ListAssinaturaPayments} from '@/lib/api/_assinatura'

// Interface simples - recebe codassinatura diretamente
interface Props {
  codassinatura: string;
}

type Assinatura = {
  id: string;
  status_invoice: string;
  ciclo_assinatura: string;
  value_invoice: number;
  description: string;
  forma_pagamento: string;
  status_split: string;
};

// Função recebe codassinatura diretamente
export default function AssinaturaListPayments({ codassinatura }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [idfatura, setidfatura] = useState("");
  const [datalistAssinaturaPayments, setdatalistAssinaturaPayments] = useState<Assinatura[]>([]);

  let name ='FULANO DE TALZ'

  const updateListFaturas = async () => {
    console.log('Botao clicado ...')
    try {
      setLoading(true);
      // Usa codassinatura diretamente
      const response = await ListAssinaturaPayments(codassinatura);
        if( response.event === 'LIST_ASSINATURA_PAYMENTS_FAILED'){
          toast.error(response.message );
          setdatalistAssinaturaPayments(response.data);
        }

        if( response.event === 'LIST_ASSINATURA_PAYMENTS_SUCCESS'){
          toast.success(response.message );
          setdatalistAssinaturaPayments(response.data);
        }

    } catch (error) {
      toast.error('Erro ao atualizar Faturas');
    } finally {
      setLoading(false);
    }  
  };

  useEffect(() => {
    updateListFaturas();
  }, []);

  const handleImportFatura = async () => {
    if (!idfatura.trim()) {
      toast.warning("ID da Fatura é obrigatório!");
      return;
    }
    setLoading(true);

    try {
      const response = await importFatura(idfatura);
      console.log(' ----------- viewFatura');
        console.log(response);
      console.log(' ----------- viewFatura');

      if( response.event === 'INVOICE_VIEW_SUCCESS'){
        toast.success(response.message );
        setidfatura(" ");
        setOpenDialog(false); // Fecha o dialog
        updateListFaturas();
      }

      if( response.event === 'INVOICE_VIEW_FAILED'){
        toast.info(response.message );
        setidfatura("");
      }

      if( response.event === 'INVOICE_VIEW_DUPLICATE'){
        toast.info(response.message );
        setidfatura("");
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

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4 mt-4">
          <div className="basis-full w-full max-w-full border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold mb-4">Faturas</h3>
              
              <div className="flex gap-2">
                {/* Botão Atualizar Lista de Assinaturas */}
                <Button onClick={updateListFaturas} >
                  <RefreshCcw className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Atualizar</span>
                </Button>

                {/* Importar Assinatura */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button >
                      <FilePlus2Icon className="w-4 h-4 sm:hidden" /> 
                      <span className="hidden sm:inline">Importar Fatura</span>
                    </Button>
                  </DialogTrigger>

                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Importar Assinatura</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="nome">ID Fatura</Label>
                        <Input
                          id="nome"
                          placeholder="Digite o ID Da Fatura"
                          value={idfatura}
                          onChange={(e) => setidfatura(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button onClick={handleImportFatura}>
                        {loading ? "Importando ..." : "Importar Fatura"}
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
                    <TableHead>Situação</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Split</TableHead>
                    <TableHead colSpan={2}>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {datalistAssinaturaPayments.map(( dataInvoice ) => (
                    <TableRow key={dataInvoice.id}>
                    <TableCell ><span className="font-medium">{dataInvoice.status_invoice}</span></TableCell>
                    <TableCell ><span className="font-medium text-sm">R$ {dataInvoice.value_invoice}</span></TableCell>
                    <TableCell ><span className="font-medium">{dataInvoice.forma_pagamento}</span></TableCell>

                    <TableCell className="text-xs">
                      {dataInvoice.status_split ? (
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
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/assinatura/payments/list/${dataInvoice.id}`)}>
                                    <CircleDollarSign className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Visualizar Faturas</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => router.push(`/customer/view/`)}>
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}