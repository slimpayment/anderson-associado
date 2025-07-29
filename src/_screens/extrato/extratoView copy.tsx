'use client';
import { useEffect, useState, ChangeEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar';
import { HeaderDashboard } from '@/components/dashboard/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { viewAssociado, NovoLancamentoInterno, ListExtratoInterno } from '@/lib/api/_associado';

import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { BadgeDollarSign, BanIcon, CheckCircle2, CircleDollarSign, Clock, Filter, Info, Lock, Plus, PlusCircle, PlusIcon, RefreshCcw, Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// IMPORTAR O HOOK
import { useToken } from '@/hooks/useToken'; // Ajuste o caminho conforme sua estrutura
import Router from 'next/router';
import axios from 'axios';

interface Props {
  idassociado: string;
  tokenIdAssociado: string;
  dadosAssociado: any;
}

type ExtratoListSplit = {
  id_split: string;
  name_customer : string;
  data_vencimento : string;
  description : string;
  status_split: string;
  valor_split: number;
  tipo_split: string;
  numero_fatura: number;
  value_percentual : string;
};
type DetailsAssociado = {
  token: string;
  idassociado : string;
};


type ExtratoListinterno = {
  id_extrato_interno: string;
  name_customer : string;
  data_lancamento : string;
  categoria : string;
  atividade : string;
  value: number;
  description : string;


};

type NovoLancamento = {
  token: string
  idassociado : string;
  statuslancamento : string;
  valorlancamento : string;
  datalancamento : string;
  description : string;
};

type dataFilter = {
  dataInicial : string;
  dataFinal : string;
};

// export default function AssociadoView({ idassociado }: Props) {
export default function ExtratoView({ idassociado }: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [nameprofile,setnameprofile] = useState();
  const [datalistExtratoSplit, setdatalistExtratoSplit] = useState<ExtratoListSplit[]>([]);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [showFiltro, setShowFiltro] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogFilter, setdialogFilter] = useState(false);
  const [ description, setdescription ] = useState('');
  const [ valorLancamento, setvalorLancamento ] = useState('');
  const [ datalancamento, setdatalancamento ] = useState('');
  const [ selectStatus, setselectStatus ] = useState('');
  // extrato Interno
    const [datalistExtratoInterno, setdatalistExtratoInterno] = useState<ExtratoListinterno[]>([]);

  const [ totalPago, settotalPago ] = useState('');
  const [ totalPendente, settotalPendente ] = useState('');
  const [ totalVencido, settotalVencido ] = useState('');
  const [ qtdExtrato, setqtdExtrato ] = useState('');


  // USAR O HOOK PARA ACESSAR O TOKEN
  const { token, loading: tokenLoading, isAuthenticated } = useToken();
  let tokenIdAssociado: string = token!; // Força sem validação







  // Inicio Paginação tabela
  const ITEMS_PER_PAGE = 10;
  const totalExtrato = `${qtdExtrato}`;
  const [currentPage, setCurrentPage] = useState(1);

  //const totalPages = Math.ceil(datalistExtratoSplit.length / ITEMS_PER_PAGE);
  const totalPages = Math.ceil( Number(totalExtrato) / ITEMS_PER_PAGE );
  
  const paginatedData = useMemo(() => {
      if (!Array.isArray(datalistExtratoSplit)) return []; // Evita o erro

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return datalistExtratoSplit.slice(start, end);
  }, [currentPage, datalistExtratoSplit]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^\d]/g, '');
    const floatValue = (parseInt(numericValue || '0', 10) / 100).toFixed(2);
    return floatValue
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setvalorLancamento(formatted);
  };

  let addRegisterExtrato = async () => {
    const novoLancamento: NovoLancamento = {
      token: token!,
      idassociado: idassociado,
      valorlancamento: valorLancamento,
      statuslancamento : 'PENDING',
      datalancamento : datalancamento,
      description: description
    };


    const dataNovoLancamento = await NovoLancamentoInterno(novoLancamento);
    let dataNovoLancamentoEvent = dataNovoLancamento.event;
    console.log('----------------- NovoLancamentoInterno event')
    console.log( dataNovoLancamentoEvent )
    console.log('----------------- NovoLancamentoInterno event')

    if(dataNovoLancamentoEvent === 'LANCAMENTO_INTERNO_FAILED'){
      toast.error( dataNovoLancamento.message );
      setDialogOpen(false);
    }
    if(dataNovoLancamentoEvent === 'LANCAMENTO_INTERNO_CREATED'){
      toast.success( dataNovoLancamento.message );
      ViewListLancamentoExterno();
      setDialogOpen(false);
    }


  }



  const aplicarFiltro = async () => {
    
    const dataFilter: dataFilter = {

      dataInicial: dataInicial,
      dataFinal : dataFinal,
    };

    //const dataNovoFilter = await viewFilter(dataFilter);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${API_URL}/associado/filter/`,{
      token: token ,
      dataInicial : dataFilter.dataInicial,
      dataFinal : dataFilter.dataFinal  
    });
    let resultData = response.data;
    setdatalistExtratoSplit( resultData.data );
    setqtdExtrato( resultData.CountExtratoTotal)
    settotalPago(resultData.statics.totalPago);
    settotalPendente(resultData.statics.totalPendente);
    settotalVencido(resultData.statics.totalVencido);

    setdialogFilter(false);
    console.log('Consultando filtros')
    console.log( resultData )
    console.log('Consultando filtros')

  };



  const detailsAssociado = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(`${API_URL}/associado/details/`,{
      token: token
    });

    let responseData = response.data;
    let responseEvent = responseData.event;

    setdatalistExtratoSplit( responseData.list_extrato_split );
    setnameprofile(responseData.nameAssociado);

      setqtdExtrato( responseData.CountExtratoTotal)
      settotalPago(responseData.statics.totalPago);
      settotalPendente(responseData.statics.totalPendente);
      settotalVencido(responseData.statics.totalVencido);  


    if( responseEvent === 'SESSION_EXPIRE' ){
      toast.error('Sessão Expirada');
        document.cookie = 'token=; path=/; max-age=0'
        console.log('Deslogando ....')
        router.push('/');

    }

  };

  const viewDataAssociado = async () => {

    try {

      
      //const dataViewAssociado = await viewAssociado(tokenIdAssociado);
      const dataViewAssociado = await viewAssociado();

      setqtdExtrato('')
      settotalPago(dataViewAssociado.statics.totalPago);
      settotalPendente(dataViewAssociado.statics.totalPendente);
      settotalVencido(dataViewAssociado.statics.totalVencido);  

      if( dataViewAssociado.event === 'ASSOCIADO_VIEW_SUCCESS'){
        setnameprofile(dataViewAssociado.data.name);
        setdatalistExtratoSplit(dataViewAssociado.list_extrato_split);
        setLoading(true);
        toast.success('Lista Atualizada com sucesso!');
      }
    } catch (error: any) {
      console.log( 'ERR consultando associadosDetails ....' )
        console.log( error )
      console.log( 'ERR consultando associadosDetails ....' )

      toast.error('Erro ao atualizar clientes');
    } finally {
      setLoading(false);
    }
  };

  const syncExtrato = async () => {
    detailsAssociado();
    toast.success('Extrato Atualizado!');
  }
//ListExtratoInterno
const ViewListLancamentoExterno = async () => {
    const DetailsAssociado: DetailsAssociado = {
      token: token!,
      idassociado: idassociado,
    };

    const dataListLancamentoInterno = await ListExtratoInterno(DetailsAssociado);
    let dataListLancamentoInternoEvent = dataListLancamentoInterno.event;


      if(dataListLancamentoInternoEvent === 'EXTRATO_INTERNO_SUCCESS'){
        setdatalistExtratoInterno(dataListLancamentoInterno.data);
      }



  };





  const updateLancamentoExterno = async () => {
      ViewListLancamentoExterno();
  };






  // EFEITO PARA MONITORAR O TOKEN
  useEffect(() => {
    if (!tokenLoading) {
      
      if (isAuthenticated) {
        // Só executa se tiver token
        detailsAssociado();
        ViewListLancamentoExterno();
      } else {
        //console.log('❌ Usuário não autenticado - redirecionando...');
        // Aqui você pode redirecionar para login se necessário
        document.cookie = 'token=; path=/; max-age=0'
        //console.log('Deslogando ....')
        router.push('/');


      }
    }
  }, [token, tokenLoading, isAuthenticated]);

  // LOADING ENQUANTO CARREGA O TOKEN
  if (tokenLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Carregando...</div>
      </div>
    );
  }



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderDashboard />
        <div className="font-bold pl-4 mt-0">
          <span className="text-[22px]">Olá, </span>
          <span className="p-1 text-[20px]">{ nameprofile }</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mt-2">
          <div className="flex-1 p-4">
            <div className="flex justify-between items-center text-muted rounded-md border-1 p-4 bg-white border-gray-500">
              <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Pago</p>
                  <p className="text-2xl font-bold text-foreground">{ totalPago }</p>
              </div>
                <div className="opacity-80"><BadgeDollarSign  className="w-6 h-6 text-green-500" /></div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex justify-between items-center text-muted rounded-md border-1 p-4 bg-white border-gray-500">
              <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Pendente</p>
                  <p className="text-2xl font-bold text-foreground">{ totalPendente }</p>
              </div>
                <div className="opacity-80"><BadgeDollarSign className="w-6 h-6 text-gray-500" /></div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex justify-between items-center text-muted rounded-md border-1 p-4 bg-white border-gray-500">
              <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Em Atraso</p>
                  <p className="text-2xl font-bold text-foreground">{ totalVencido }</p>
              </div>
                <div className="opacity-80"><BadgeDollarSign className="w-6 h-6 text-red-500" /></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">
                    <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-red-600 text-lg font-semibold mb-4 ">Aguardando Aprovação</h3>

                            <div className="flex gap-2">
                              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    <PlusCircle />
                                  </Button>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Novo Lançamento</DialogTitle>
                                  </DialogHeader>

                                    <div className="grid gap-4 py-4">
                                      <div className="flex flex-col gap-2">
                                        <Label htmlFor="nome">Descrição</Label>
                                        <Input
                                          id="description"
                                          placeholder="Descrição do Lançamento"
                                          value={description}
                                          onChange={(e) => setdescription(e.target.value)}
                                          required
                                        />
                                      </div>


                                      <div className="flex gap-4">
                                        <div className="flex flex-col gap-2 w-full">
                                          <Label htmlFor="email">Valor</Label>
                                          <Input
                                            id="valorlancamento"
                                            placeholder="Valor Lancamento"
                                            value={valorLancamento}
                                            onChange={handleChange}
                                            required
                                          />
                                        </div>

                                        <div className="flex flex-col gap-2 w-full">
                                          <Label htmlFor="email">Data</Label>
                                          <Input
                                          type="date"
                                            id="datalancamento"
                                            placeholder="Data Lançamento"
                                            value={datalancamento}
                                            onChange={(e) => setdatalancamento(e.target.value)}
                                            required
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <DialogFooter>
                                      <Button onClick={addRegisterExtrato} disabled={loading} >
                                        {loading ? "Registrando..." : "Registrar Lançamento"}
                                      </Button>
                                    </DialogFooter>
                                </DialogContent>
                              </Dialog>


                                <Button onClick={updateLancamentoExterno} >
                                    <RefreshCcw className="w-4 h-4" />
                                </Button>

                            </div>

                        </div>

                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader className="bg-muted rounded-md">
                                    <TableRow>
                                        <TableHead className="font-semibold text-sm">Data</TableHead>
                                        <TableHead className="font-semibold text-sm">Descrição</TableHead>
                                        <TableHead className="font-semibold text-sm">Valor</TableHead>
                                        <TableHead className="font-semibold text-sm text-left">Ação</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {datalistExtratoInterno.map((datalancamento) => (
                                        <TableRow key={datalancamento.id_extrato_interno}>
                                            <TableCell>{datalancamento.data_lancamento}</TableCell>
                                            <TableCell>{datalancamento.description}</TableCell>
                                            <TableCell className="font-bold">R$ {Number(datalancamento.value).toFixed(2)}</TableCell>

                                            <TableCell className="text-left">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => router.push(`/associado/view/`)}
                                                >
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger> <BanIcon className="w-4 h-4 text-red-600" /> </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Remover Lancamento</p>
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





                    <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold mb-4">Extrato</h3>

              <div className="flex gap-2">
              <Dialog open={dialogFilter} onOpenChange={setdialogFilter}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Filtro por Data</DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 py-2">
                    <Input
                      type="date"
                      value={dataInicial}
                      onChange={(e) => setDataInicial(e.target.value)}
                      placeholder="Data inicial"
                    />
                    <Input
                      type="date"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)}
                      placeholder="Data final"
                    />
                  </div>

                  <DialogFooter>
                    <Button onClick={aplicarFiltro}>Aplicar Filtro</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>


              <Button onClick={syncExtrato}>
                <RefreshCcw className="w-4 h-4 " />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader className="bg-muted rounded-md">
                <TableRow>
                  <TableHead className="font-semibold text-sm">Data Vencimento</TableHead>
                  <TableHead className="font-semibold text-sm">Descrição</TableHead>
                  <TableHead className="font-semibold text-sm">Cliente</TableHead>
                  <TableHead className="font-semibold text-sm">Valor</TableHead>
                  <TableHead className="font-semibold text-sm">Status</TableHead>
                </TableRow>
               </TableHeader>

        <TableBody>
          {paginatedData.map((data) => (
            <TableRow key={data.id_split}>
              <TableCell className="font-medium">{data.data_vencimento}</TableCell>
              <TableCell className="font-medium">{data.description}</TableCell>
              <TableCell className="font-medium">{data.name_customer}</TableCell>
              <TableCell className="font-medium">
                 R$ {data.valor_split}
                {data.tipo_split === "PERCENTUAL" && (
                  <small className='font-bold'> ( {data.value_percentual} %)</small>
                )}
                </TableCell>

              <TableCell className="font-medium">
                {data.status_split === "APROVADO" && (
                    <Badge className="text-white bg-green-500">{data.status_split}</Badge>
                )}
                
                {data.status_split === "PAGO" && (
                  <Badge className="text-white bg-green-500">{data.status_split}</Badge>
                )}
                

                {data.status_split === "PENDENTE" && (
                  <Badge className="text-white bg-gray-500">{data.status_split}</Badge>
                )}

                {data.status_split === "VENCIDO" && (
                  <Badge className="text-white bg-red-500">{data.status_split}</Badge>
                )}

                {data.status_split === "INDEFINIDO" && (
                  <Badge className="text-white bg-dark">{data.status_split}</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                Anterior
              </Button>
              <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                Próxima
              </Button>
            </div>
          </div>
          </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}