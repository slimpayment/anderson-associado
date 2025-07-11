import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function importCustomer(id_asaas: string) {
  try {
    console.log('Importing customer with ID:', id_asaas);
    const response = await axios.post(`${API_URL}/customer/import/${id_asaas}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function viewCustomer(idcustomer: string) {
  try {
    const response = await axios.post(`${API_URL}/customer/view/${idcustomer}`);

    return response.data;
  } catch (error: any) {
    // Reempacotar o erro com mensagem útil
    throw error;
  }
}








export async function ListCustomer() {
  try {
    const response = await axios.post(`${API_URL}/customer/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}











