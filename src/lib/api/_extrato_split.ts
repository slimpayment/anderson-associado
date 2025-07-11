import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function extratoSplitAssinatura(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/assinatura/split/${id_assinatura}/list`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}


export async function extratoSplitFatura(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/split/list/assinatura/${id_assinatura}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar assinatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a assinatura. Tente novamente.");
  }
}