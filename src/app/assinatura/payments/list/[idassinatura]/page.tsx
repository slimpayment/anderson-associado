import AssinaturaListPayments from '@/_screens/assinatura/AssinaturaListPayments';

interface Props {
  params: Promise<{
    codassinatura: string;
  }>;
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;

  return (
    <AssinaturaListPayments 
      codassinatura={resolvedParams.codassinatura}
    />
  );
}