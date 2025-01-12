import { SessionProvider } from 'next-auth/react';
import React from 'react'

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>

     <SessionProvider>
    {children}
     </SessionProvider> 
    </div>
  )
}

export default layout
