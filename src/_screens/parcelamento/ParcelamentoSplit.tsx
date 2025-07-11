'use client';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


import { useEffect, useState,ChangeEvent  } from 'react';
import { useRouter } from 'next/navigation'

import { AppSidebar } from '@/components/app-sidebar';
import { HeaderDashboard } from '@/components/dashboard/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogTrigger ,
  DialogContent ,
  DialogHeader ,
  DialogTitle ,
  DialogFooter ,
  DialogDescription
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Ban, Copy, Eye, FilePlus2Icon, Mail, Pencil, Printer, RefreshCcw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { listAssociado } from '@/lib/api/_associado'
import { Badge } from '@/components/ui/badge';

  import { SaveSplitParcelamento, listAssociadosSplit, synclistExtratoSplit  } from '@/lib/api/_parcelamento';




interface Props {
  idparcelamento: string;
}

type Associado = {
  id_associado: string;
  name: string;
  ciclo_assinatura: string;
  value_assinatura: number;
  description: string;
  forma_pagamento: string;
  status_split: string;
};

type ListAssociadosSplit = {
  id_split: string;
  nome_associado: string;
  tipo_split: string;
  value_split: number;
  cfg_percentual : string;
};


type ListExtratoSplit = {
  id_extrato: string;
  nome_associado: string;
  data_vencimento: string;
  value_comissao: number;
  status: string;
  description: number;
};
type DetailsAssinatura = {
  nome_cliente: string;
  valor_assinatura: string;
  ciclo_assinatura: string;
  forma_pagamento: string; // <--- altere para `string` se retorna "OPCIONAL"
  qtdParcelas: string;
};




export default function AssinaturaSplit({ idparcelamento }: Props) {

  const router = useRouter();
  const [ loading, setLoading] = useState(false);
  const [ openAddAssociado, setOpenAddAssociado] = useState(false);
  const [ openSyncFaturas, setopenSyncFaturas] = useState(false);




  const [ descSplit, setdescSplit] = useState("");
  const [ datalistAssociados, setDatalistAssociados] = useState<Associado[]>([]);
  const [ datalistAssociadosSplit, setdatalistAssociadosSplit] = useState<ListAssociadosSplit[]>([]);
  const [ datalistExtratoSplit, setdatalistExtratoSplit] = useState<ListExtratoSplit[]>([]);
  const [ selectedAssociado, setSelectedAssociado] = useState("");
  const [ tipoComissao, setTipoComissao] = useState('');
  const [ valueComissao, setValueComissao] = useState('');
  const [detailsAssinatura, setdetailsAssinatura] = useState<DetailsAssinatura | null>(null);
  const [ totalAssociadosSplit, settotalAssociadosSplit] = useState("");


// lista associados cadastrado via split

const SynclistAssociadosSplit = async () => {
  
  const resultExtrato = await listAssociadosSplit(idparcelamento);
  const viewEvent = resultExtrato.event;

  if( viewEvent === 'SPLIT_LIST_ASSOCIADOS_SUCCESS' ){
    setdatalistAssociadosSplit(resultExtrato.data);
    settotalAssociadosSplit(resultExtrato.count);
    toast.success(resultExtrato.message);
  }
};




//listExtrato

  const SynclistExtrato = async () => {

  const resultExtrato = await synclistExtratoSplit(idparcelamento);

    if( resultExtrato.event === 'EXTRATO_LIST_SUCCESS' ){

      setdatalistExtratoSplit(resultExtrato.result);
      toast.success(resultExtrato.message);
    }

  };



const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^\d]/g, '');
    const floatValue = (parseInt(numericValue || '0', 10) / 100).toFixed(2);
    return floatValue
    // .replace('.', ',')
    // .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValueComissao(formatted);
};


const getPlaceholder = () => {
    if (tipoComissao === 'FIXO') {
      return 'Digite o valor fixo';
    } else if (tipoComissao === 'PERCENTUAL') {
      return 'Digite o percentual (%)';
    } else {
      return 'Informe o valor';
    }
};

const syncListAssociados = async () =>{
 const response = await listAssociado();
setDatalistAssociados(response.data);
  //toast.success('Lista de associados atualizada com sucesso!');

}


const syncAssociadosSplitList = async () =>{
  const responseAssociadosSplitList = await listAssociadosSplit(idparcelamento);

  if( responseAssociadosSplitList.event === "SPLIT_LIST_ASSOCIADOS_SUCCESS"){
    settotalAssociadosSplit(responseAssociadosSplitList.data[0].totalAssociados)
    setdatalistAssociadosSplit(responseAssociadosSplitList.data);
    //toast.success('Splits Associados Configurados'); 
  }




}

// puxa extrato

const syncExtratoSplit = async () =>{
    const dataExtrato = await synclistExtratoSplit(idparcelamento);
    if( dataExtrato.event === "LIST_EXTRATO_PARCELAMENTO_SUCCESS" ){

    toast.success(dataExtrato.message);
    setdatalistExtratoSplit(dataExtrato.data);
  }

  if( dataExtrato.event === "LIST_EXTRATO_PARCELAMENTO_FAILED" ){
    toast.error(dataExtrato.message);
    setdatalistExtratoSplit(dataExtrato.data);
  }



  

}





  // salva split
  const settingSplit = async () => {

    let dadosSaveSplit = {
      id_parcelamento: idparcelamento,
      id_associado: selectedAssociado,
      description: descSplit,
      total_comissao: valueComissao,
      tipo_comissao: tipoComissao
    }

    toast.info('Cadastrando Associado ...');



    try {
      //setLoading(true);
          const response = await SaveSplitParcelamento(dadosSaveSplit);



      if( response.event === 'SPLIT_CREATED_SUCCESS' ){




      // const responseList = await listAssociadosSplit(idassinatura);
      await syncListAssociados();
      await syncExtratoSplit();
      await SynclistAssociadosSplit();

        //setdatalistSplit(responseList.data);
            toast.success(response.message);
            //syncAssociadosSplitList();
            setOpenAddAssociado(false)
      }

      if( response.event === 'SPLIT_CREATED_FAILED' ){

        //const responseList = await listSplit(idassinatura);
        //setdatalistSplit(responseList.data);
        toast.warning(response.message);
        setOpenAddAssociado(true)
      }



    } catch (error) {
      
    }




    // Implemente sua lógica de adicionar aqui
  };












  useEffect(() => {
  SynclistAssociadosSplit();
  syncListAssociados();
  syncAssociadosSplitList();
  syncExtratoSplit();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderDashboard />

      <div className="flex flex-col md:flex-row gap-4 p-4 mt-4">
        {/* Área 1: Detalhes do Cliente */}
        <div className="basis-full md:basis-1/4 w-full p-4 bg-white rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            { detailsAssinatura?.nome_cliente }
          </h2>
          <dl className="text-sm text-gray-700 space-y-1">

            <div className="flex justify-between">
              <dt>Forma de pagamento:</dt>
              <dd>{ detailsAssinatura?.forma_pagamento }</dd>
            </div>

            <div className="flex justify-between">
              <dt>Valor:</dt>
              <dd>R$ { detailsAssinatura?.valor_assinatura }</dd>
            </div>

            <div className="flex justify-between">
              <dt>Ciclo:</dt>
              <dd>{ detailsAssinatura?.ciclo_assinatura }</dd>
            </div>

            <div className="flex justify-between">
              <dt>Qtd Parcelas:</dt>
              <dd>  { detailsAssinatura?.qtdParcelas }</dd>
            </div>

          </dl>
        </div>
        
      </div>




        <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4 mt-4">

          <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">

            
            <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 font-bold">
              Splits Configurados (<span className='text-red-600'>{totalAssociadosSplit}</span>)
              </span>
           
              <Dialog open={openAddAssociado} onOpenChange={setOpenAddAssociado}>
                <DialogTrigger asChild>
                  <Button disabled={loading}>
                    <FilePlus2Icon className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">Novo Split</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Split</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label>Selecione um associado</Label>
                      <Select
                        value={selectedAssociado}
                        onValueChange={setSelectedAssociado}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um associado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {datalistAssociados.map((assoc) => (
                              <SelectItem key={assoc.id_associado} value={assoc.id_associado}>
                                {assoc.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>

                      </Select>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <Label>Tipo</Label>
                        <Select value={tipoComissao} onValueChange={setTipoComissao}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Forma de Comissionamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="FIXO">Fixo</SelectItem>
                              <SelectItem value="PERCENTUAL">Percentual</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Label>Ganho Fixo</Label>
                        <Input
                          id = "ganho_fixo"
                          placeholder={getPlaceholder()}
                          value={valueComissao}
                          //onChange={(e) => setValueComissao(e.target.value)}
                          onChange={handleChange}

                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Descrição</Label>
                      <Input
                        placeholder="Descrição do Split"
                        value={descSplit}
                        onChange={(e) => setdescSplit(e.target.value)}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={settingSplit} disabled={loading}>
                      {loading ? "Vinculando..." : "Vincular Associado"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-sm">Associado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            { datalistAssociadosSplit.map((dataAssociado) => (
              <TableRow key={dataAssociado.id_split}>
                <TableCell className='font-medium'>{dataAssociado.nome_associado}</TableCell>
                <TableCell>
                  <Badge className="text-white">{dataAssociado.tipo_split}</Badge>
                </TableCell>

                      <TableCell>
                        {dataAssociado.tipo_split === 'PERCENTUAL'
                          ? `R$ ${Number(dataAssociado.value_split).toFixed(2)} (   ${Number(dataAssociado.cfg_percentual).toFixed(2)} %) `
                          : `R$ ${Number(dataAssociado.value_split).toFixed(2)}`}
                      </TableCell>

                  <TableCell className="text-left flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <Pencil className="w-4 h-4 text-blue-800" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Editar Split</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <Ban className="w-4 h-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remover Split</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
              </TableRow>
            ))}
            </TableBody>
            </Table>

         

          </div>

          <div className="basis-full md:basis-3/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold mb-4">Extrato</h3>

              




            </div>

            <div className="overflow-x-auto w-full">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Associado</TableHead>
                <TableHead>Data Vencimento</TableHead>
                <TableHead>Valor <span className='text-sm'>(split)</span> </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {datalistExtratoSplit.map((dataExtrato) => (
              <TableRow key={dataExtrato.id_extrato}>

                <TableCell> {dataExtrato.nome_associado} </TableCell>
                <TableCell> {dataExtrato.data_vencimento} </TableCell>
                <TableCell>R$ {dataExtrato.value_comissao} </TableCell>
                {/* <TableCell >
                  
                <span className="font-medium" >{dataExtrato.status}</span>

                </TableCell> */}
                <TableCell className="font-medium">
                  {dataExtrato.status === "PAGO" && (
                    <Badge className="text-white bg-green-500">{dataExtrato.status}</Badge>
                  )}

                  {dataExtrato.status === "PENDENTE" && (
                    <Badge className="text-white bg-gray-500">{dataExtrato.status}</Badge>
                  )}

                  {dataExtrato.status === "ATRASO" && (
                    <Badge className="text-white bg-yellow-700">{dataExtrato.status}</Badge>
                  )}


                  {dataExtrato.status === "INDEFINIDO" && (
                    <Badge className="text-white bg-dark">{dataExtrato.status}</Badge>
                  )}

                </TableCell>








                  <TableCell className="text-left flex gap-1">
                    <TooltipProvider>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <Ban className="w-4 h-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remover</TooltipContent>
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
