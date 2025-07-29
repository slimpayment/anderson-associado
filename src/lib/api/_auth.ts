import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type tokenSession = {
  token : string;
};


type dataLogin = {
  email : string;
  password : string;
};


export async function authLogin(dataLogin: dataLogin) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`,{
      email : dataLogin.email ,
      password : dataLogin.password ,
      
    });
    console.log('---------------------response')
    console.log(response)
    console.log('---------------------response')

    return response.data;
  } catch (error: any) {
    // Reempacotar o erro com mensagem útil
    return error;

    console.log('------------------- error responseAuth')
    console.log(error) 
    console.log('------------------- error responseAuth')





    throw new Error(


      
      error?.code === 'ECONNREFUSED'
        ? 'Não foi possível conectar ao servidor da API.'
        : error?.message || 'Erro desconhecido ao buscar cliente.'
    );
  }

}


export async function verifySession(tokenSession: tokenSession) {
  try {
    const response = await axios.post(`${API_URL}/verifysession`,{
      token : tokenSession.token ,
      
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




