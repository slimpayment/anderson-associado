import axios from 'axios';
 const API_URL = process.env.NEXT_PUBLIC_API_URL;


type SaveAssociado = {
  id_assinatura : string;
  id_associado : string;
  description : string;
  total_comissao : string;
  tipo_comissao : string;
};


export async function detailstAssinatura(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/details/${id_assinatura}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}





export async function importAssinatura(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/import/${id_assinatura}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}


export async function ListAssinaturaCustomer(idcustomer: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/list/${idcustomer}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function SyncListAssinaturaCustomer(idcustomer: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/sync/${idcustomer}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}








export async function ListAssinaturaPayments(idassinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/payments/list/${idassinatura}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function SaveSplit (SaveAssociado: SaveAssociado) {
  try {
    const response = await axios.post(`${API_URL}/split/assinatura/create`,{
      id_assinatura: SaveAssociado.id_assinatura,
      id_associado: SaveAssociado.id_associado,
      description: SaveAssociado.description,
      total_comissao: SaveAssociado.total_comissao,
      tipo_comissao: SaveAssociado.tipo_comissao
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}



export async function listAssociadosSplit(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/split/list/associados/assinatura/${id_assinatura}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}



export async function listExtratoSplit(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/extrato/list/${id_assinatura}`);

    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}


