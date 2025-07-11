


export  function BodyPageDefault({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div className='w-full mt-1'> 
        {/* <div className="flex-1 h-1 bg-blue-600 rounded-t" /> */}
        
        {children}

    </div>
  );
}
