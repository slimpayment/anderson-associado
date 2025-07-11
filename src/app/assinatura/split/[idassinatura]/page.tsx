import AssinaturaSplit from '@/_screens/assinatura/AssinaturaSplit';

// interface Props {
//   params: {
//     idassinatura: string;
//   };
// }
interface Props {
  params: Promise<{
    idassinatura: string;
  }>;
}


export default async function Page({ params }: Props) {
  const resolvedParams = await params;

  return (  
    <AssinaturaSplit 
      //codassinatura={idassinatura}
      idassinatura={resolvedParams.idassinatura}

    />
  );
}
