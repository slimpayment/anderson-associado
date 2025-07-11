import { viewCustomer } from '@/lib/api';
import AssociadoView from '@/_screens/associado/view/AssociadoView';

// interface Props {
//   params: {
//     idassociado: string;
//   };
// }

interface DetailsProps {
  params: Promise<{ idassociado: string }>;
}






export default async function Page({ params }: DetailsProps ) {
  const { idassociado } = await params;
  const associado = await viewCustomer(idassociado);

  return (
    <AssociadoView 
      idassociado={idassociado} 
      dadosAssociado={associado} 
    />
  );
}

