// In portfolio/src/app/LayoutWrapper.tsx

'use client'; // Isko Client Component banayein

import { usePathname } from 'next/navigation';
import Header from '@/components/Header'; // Header ko yahan import karein

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {/* Condition: Header ko sirf tab dikhao jab admin page na ho */}
      {!isAdminPage && <Header />}
      
      <main>{children}</main>
    </>
  );
}