import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


type NovoAssociado = {
  nome : string;
  email : string;
  mobile : string;

};


type NovoLancamento = {
  idassociado : string;
  statuslancamento : string;
  valorlancamento : string;
  datalancamento : string;
  description : string;

};


type dataFilter = {
  idassociado : string;
  dataInicial : string;
  dataFinal : string;

};


export async function viewAssociado(idassociado: string) {
  try {
    const response = await axios.post(`${API_URL}/associado/view/${idassociado}`);
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




export async function viewFilter(dataFilter: dataFilter) {
  try {
    const response = await axios.post(`${API_URL}/associado/extrato/filtro/view/${dataFilter.idassociado}`,{
      idassociado : dataFilter.idassociado,
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






