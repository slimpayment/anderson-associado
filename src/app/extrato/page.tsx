import { viewCustomer } from '@/lib/api';
import ExtratoView from '@/_screens/extrato/extratoView';



interface DetailsProps {
  params: Promise<{
    idassociado: string
    tokenIdAssociado: string
    dadosAssociado: string
    
  }>;
}






export default async function Page({ params }: DetailsProps ) {
  const { idassociado } = await params;
  const associado = await viewCustomer(idassociado);




  
  const { tokenIdAssociado } = await params;
  return (
    <ExtratoView 
      idassociado={idassociado} 
      tokenIdAssociado={tokenIdAssociado}
      dadosAssociado={associado}
    />
  );
}

