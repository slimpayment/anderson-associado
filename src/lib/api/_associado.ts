import { useToken } from '@/hooks/useToken';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


type NovoAssociado = {
  nome : string;
  email : string;
  mobile : string;

};


type NovoLancamento = {
  token: string
  idassociado : string;
  statuslancamento : string;
  valorlancamento : string;
  datalancamento : string;
  description : string;

};
type ExtratoInterno = {
  token: string
  idassociado : string;
};



type dataFilter = {
  dataInicial : string;
  dataFinal : string;

};


// export async function viewAssociado(idassociado: string) {
export async function viewAssociado() {
  try {
    let tokenSession = await useToken();


    console.log('------------ API viewAssociado');
    console.log( tokenSession );
    console.log('------------ API viewAssociado');

    const response = await axios.post(`${API_URL}/associado/details/`,{
      token: tokenSession
    });
    return response.data;
  } catch (error: any) {
    // Reempacotar o erro com mensagem útil
    throw new Error(
      error?.code === 'ECONNREFUSED'
        ? 'Não foi possível conectar ao servidor da API.'
        : error?.message || 'Erro desconhecido ao buscar cliente.'
    );
  }

}


export async function listAssociado() {
try {
    const response = await axios.post(`${API_URL}/associado/list`);
    return response.data;
  } catch (error: any) {
    // Reempacotar o erro com mensagem útil
    throw new Error(
      error?.code === 'ECONNREFUSED'
        ? 'Não foi possível conectar ao servidor da API.'
        : error?.message || 'Erro desconhecido ao buscar cliente.'
    );
  }

}

export async function novoAssociado( NovoAssociado : NovoAssociado) {
  try {
    const response = await axios.post(`${API_URL}/associado/novo`,{
      nome : NovoAssociado.nome,
      email : NovoAssociado.email,
      mobile : NovoAssociado.mobile,


      
    });
    return response.data;
  } catch (error: any) {
    // Reempacotar o erro com mensagem útil
    throw new Error(
      error?.code === 'ECONNREFUSED'
        ? 'Não foi possível conectar ao servidor da API.'
        : error?.message || 'Erro desconhecido ao buscar cliente.'
    );
  }
}


export async function NovoLancamentoExtrato(NovoLancamento : NovoLancamento) {
  try {
      const response = await axios.post(`${API_URL}/associado/add/extrato/${NovoLancamento.idassociado}`,{
        idassociado: NovoLancamento.idassociado,
        valorlancamento: NovoLancamento.valorlancamento,
        statuslancamento : NovoLancamento.statuslancamento,
        datalancamento : NovoLancamento.datalancamento, // ou outro valor
        description: NovoLancamento.description // ou outra descrição
      });
      return response.data;
    } catch (error: any) {
      // Reempacotar o erro com mensagem útil
      throw new Error(
        error?.code === 'ECONNREFUSED'
          ? 'Não foi possível conectar ao servidor da API.'
          : error?.message || 'Erro desconhecido ao buscar cliente.'
      );
    }

}

export async function NovoLancamentoInterno(NovoLancamento : NovoLancamento) {

  try {
      const response = await axios.post(`${API_URL}/associado/add/lancamento/interno`,{
        token: NovoLancamento.token,
        idassociado: NovoLancamento.idassociado,
        valorlancamento: NovoLancamento.valorlancamento,
        statuslancamento : NovoLancamento.statuslancamento,
        datalancamento : NovoLancamento.datalancamento, // ou outro valor
        description: NovoLancamento.description // ou outra descrição
      });
      return response.data;
    } catch (error: any) {
      // Reempacotar o erro com mensagem útil
      throw new Error(
        error?.code === 'ECONNREFUSED'
          ? 'Não foi possível conectar ao servidor da API.'
          : error?.message || 'Erro desconhecido ao buscar cliente.'
      );
    }

}


export async function ListExtratoInterno(ExtratoInterno : ExtratoInterno) {

  try {
      const response = await axios.post(`${API_URL}/associado/list/extrato/interno`,{
        token: ExtratoInterno.token,
        idassociado: ExtratoInterno.idassociado,
      });
      return response.data;
    } catch (error: any) {
      // Reempacotar o erro com mensagem útil
      throw new Error(
        error?.code === 'ECONNREFUSED'
          ? 'Não foi possível conectar ao servidor da API.'
          : error?.message || 'Erro desconhecido ao buscar cliente.'
      );
    }

}





export async function viewFilter(dataFilter: dataFilter) {
  try {
    let tokenSession = await useToken();

    console.log('------------ API viewFilter');
    console.log( tokenSession );
    console.log('------------ API viewFilter');





    const response = await axios.post(`${API_URL}/associado/filter`,{
      token: tokenSession ,
      dataInicial : dataFilter.dataInicial,
      dataFinal : dataFilter.dataFinal  
    });
    return response.data;
  } catch (error: any) {
    // Reempacotar o erro com mensagem útil
    throw new Error(
      error?.code === 'ECONNREFUSED'
        ? 'Não foi possível conectar ao servidor da API.'
        : error?.message || 'Erro desconhecido ao buscar cliente.'
    );
  }

}





