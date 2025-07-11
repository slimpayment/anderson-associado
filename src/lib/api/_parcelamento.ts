import axios from 'axios';
 const API_URL = process.env.NEXT_PUBLIC_API_URL;


type SaveAssociado = {
  id_parcelamento : string;
  id_associado : string;
  description : string;
  total_comissao : string;
  tipo_comissao : string;
};




export async function synclistExtratoSplit(id_parcelamento: string) {
  try {
    const response = await axios.post(`${API_URL}/parcelamento/extrato/${id_parcelamento}/list`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}

export async function listAssociadosSplit(id_parcelamento: string) {
  try {
    const response = await axios.post(`${API_URL}/split/list/associados/parcelamento/${id_parcelamento}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}

export async function SaveSplitParcelamento (SaveAssociado: SaveAssociado) {
  try {
    const response = await axios.post(`${API_URL}/split/parcelamento/create`,{
      id_parcelamento: SaveAssociado.id_parcelamento,
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








export async function ListParcelamentoCustomer(idcustomer: string) {
  try {
    const response = await axios.post(`${API_URL}/parcelamento/list/${idcustomer}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function ListParcelamentosSplit(idcustomer: string) {
  try {
    const response = await axios.post(`${API_URL}/parcelamento/list/${idcustomer}/sync`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function SyncListParcelamentosCustomer(idcustomer: string) {
  try {
    const response = await axios.post(`${API_URL}/parcelamento/list/${idcustomer}/sync`);
    return response.data;
  } catch (error) {
    throw error;
  }
}







