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
  PlusIcon,CheckCircle, Info, AlertTriangle
} from "lucide-react";

import { ChartContainer, ChartConfig } from "@/components/ui/chart";



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



type ExtratoListinterno = {
  id_extrato_interno: string;
  nome_associado: string;
  data_lancamento: string;
  categoria: string;
  atividade: string;
  value: number;
  description: string;
};


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"




import { useToken } from '@/hooks/useToken';
import axios from 'axios';

interface Props {
  idassociado: string;
  tokenIdAssociado: string;
  dadosAssociado: any;
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
                {/* <div className="font-bold pl-4 mt-0">
                    <span className="text-[22px]">Olá,</span><span className="p-1 text-[20px]">{nameprofile}</span>
                </div> */}

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4">
<Alert className="mb-6 bg-blue-50 border border-black shadow-lg rounded-xl backdrop-blur-sm">
    <Info className="h-5 w-5 text-black" />
    <AlertTitle className="text-black font-semibold">Olá, {nameprofile}</AlertTitle>
    <AlertDescription className="text-black">
        Em breve novas informações no Dashboard.
    </AlertDescription>
</Alert>
                </div>

            </BodyPageDefault>
        </SidebarProvider>
    )
}