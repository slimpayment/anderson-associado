import { viewCustomer } from '@/lib/api/_customer';
import CustomerView from '@/_screens/customer/view/CustomerView';


interface DetailsProps {
  params: Promise<{ idcustomer: string }>;
}







export default async function Page({ params }: DetailsProps ) {
  const { idcustomer } = await params;
const datacustomer = await viewCustomer(idcustomer);
  
  return (  
    <CustomerView 
      idcustomer={idcustomer} 
      name={datacustomer.data.name}
    />
  );
}
