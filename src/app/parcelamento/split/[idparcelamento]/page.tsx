import ParcelamentoSplit from '@/_screens/parcelamento/ParcelamentoSplit';

// interface Props {
//   params: {
//     idassinatura: string;
//   };
// }
interface Props {
  params: Promise<{
    idparcelamento: string;
  }>;
}


export default async function Page({ params }: Props) {
  const resolvedParams = await params;

  return (  
    <ParcelamentoSplit 
      //codassinatura={idassinatura}
      idparcelamento={resolvedParams.idparcelamento}

    />
  );
}
