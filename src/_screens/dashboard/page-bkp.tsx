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
  RefreshCcw,
  PlusIcon
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

type ExtratoListinterno = {
  id_extrato_interno: string;
  nome_associado: string;
  data_lancamento: string;
  categoria: string;
  atividade: string;
  value: number;
  description: string;
};

import { useToken } from '@/hooks/useToken';
import axios from 'axios';

interface Props {
  idassociado: string;
  tokenIdAssociado: string;
  dadosAssociado: any;
}

function ReprovallDialog({ datalancamento, onApprove }: { datalancamento: ExtratoListinterno, onApprove: (id: string, otp: string) => void }) {

}







export default function Dashboard( { idassociado }: Props  ) {
    const [nameprofile, setnameprofile] = useState();

    const router = useRouter()
    
    // USAR O HOOK PARA ACESSAR O TOKEN
    const { token, loading: tokenLoading, isAuthenticated } = useToken();

    const detailsAssociado = async () => {
        // Verificar se o token existe antes de fazer a requisição
        if (!token) {
            console.log('Token não disponível ainda');
            return;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            const response = await axios.post(`${API_URL}/associado/details/`,{
                token: token
            });
            
            let responseData = response.data;
            let responseEvent = responseData.event;
            setnameprofile(responseData.nameAssociado);
        } catch (error) {
            console.error('Erro ao buscar detalhes do associado:', error);
            toast.error('Erro ao carregar dados do associado');
        }
    };

    const refreshlancamentosPendentes = async () => {
        toast.info('Função em desenvolvimento ...')
    };

    const removelancamento = async () => {
        toast.info('Função em desenvolvimento ...')
    };


    // Este useEffect só executa quando o token estiver disponível
    useEffect(() => {
        // Só executa se não estiver carregando e o token existir
        if (!tokenLoading && token) {
            detailsAssociado();
        }
        
        // Se não estiver carregando e não há token, pode redirecionar para login
        if (!tokenLoading && !token) {
            console.log('Token não encontrado, usuário não autenticado');
            // Opcional: redirecionar para login
            // router.push('/login');
        }
    }, [token, tokenLoading]); // Dependências: token e tokenLoading

    // Mostrar loading enquanto o token está sendo carregado
    if (tokenLoading) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <BodyPageDefault>
                    <HeaderDashboard/>
                    <div className="p-4">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                <p className="mt-2 text-gray-600">Carregando...</p>
                            </div>
                        </div>
                    </div>
                </BodyPageDefault>
            </SidebarProvider>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <BodyPageDefault>
                <HeaderDashboard/>
                <div className="font-bold pl-4 mt-0">
                    <span className="text-[22px]">Olá,</span><span className="p-1 text-[20px]">{nameprofile}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">

                    <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
                        
                    </div>

                    {/* Tabela com faturas */}
                    <div className="basis-full md:basis-2/4 w-full max-w-full border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold mb-4">Últimos Lancamentos</h3>

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
                                            <TableCell>{datalancamento.dataLancamento}</TableCell>
                                            <TableCell>{datalancamento.categoria}</TableCell>
                                            <TableCell>{datalancamento.atividade}</TableCell>
                                            <TableCell className="font-bold">R$ {Number(datalancamento.valor).toFixed(2)}</TableCell>

                                            <TableCell className="text-left">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={removelancamento}
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
                </div>

            </BodyPageDefault>
        </SidebarProvider>
    )
}