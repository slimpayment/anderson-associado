import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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


export async function importFatura(id_fatura: string) {
  try {
    const response = await axios.post(`${API_URL}/fatura/import/${id_fatura}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar a Fatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a Fatura. Tente novamente.");
  }
}

export async function ListFatura(id_assinatura: string) {
  try {
    const response = await axios.post(`${API_URL}/fatura/import/${id_assinatura}`);
    return response.data;
  } catch (error) {
    // Loga o erro técnico no console para DEV (se necessário)
    console.error("Erro ao importar a Fatura:", error);

    // Lança uma mensagem genérica controlada para o usuário final
    throw new Error("Não foi possível importar a Fatura. Tente novamente.");
  }
}










