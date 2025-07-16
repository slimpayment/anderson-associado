// import DashboardIndex from "@/_screens/dashboard/page";
// export default DashboardIndex;


import { cookies } from 'next/headers';
import redisClient from '@/lib/redis';
import { redirect } from 'next/navigation';


import { viewCustomer } from '@/lib/api';
import DashboardIndex from '@/_screens/dashboard/page';


interface DetailsProps {
  params: Promise<{
    idassociado: string
    tokenIdAssociado: string
    dadosAssociado: string
    
  }>;
}


export default async function Page({ params }: DetailsProps ) {


  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/');
  }

  const sessionData = await redisClient.get(`associado:${token}`);

  if (!sessionData) {
    redirect('/');
  }









  const { idassociado } = await params;
  const associado = await viewCustomer(idassociado);



  
  const { tokenIdAssociado } = await params;
  return (
    <DashboardIndex 
      idassociado={idassociado} 
      tokenIdAssociado={tokenIdAssociado}
      dadosAssociado={associado}
    />
  );
}

