import ResetPasswordUpadate from '@/_screens/auth/ResetPasswordUpadate';


interface DetailsProps {
  params: Promise<{ token: string }>;
}




export default async function Page({ params }: DetailsProps ) {
  const { token } = await params;

  return (
    <ResetPasswordUpadate 
      token={token} 
    />
  );
}



