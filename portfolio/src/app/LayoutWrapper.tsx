'use client';

import { usePathname } from 'next/navigation';
import SideNavbar from '@/components/SideNavbar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataProvider, useData } from '@/context/DataContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const { loaded } = useData();
  const [showLoader, setShowLoader] = useState(true);

  // Non-blocking loader: dismiss as soon as data is loaded OR after 1.5s max — whichever comes first.
  // This ensures Hero/Skills render immediately even if Render backend is cold-starting.
  useEffect(() => {
    if (loaded) {
      setShowLoader(false);
      return;
    }
    // Hard cap: never block UI for more than 1.5 seconds
    const maxWait = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(maxWait);
  }, [loaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && !isAdminPage ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafaf9] dark:bg-[#050A17]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Sleek Text Logo */}
              <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Samir<span className="text-blue-600 dark:text-blue-400">.</span>
              </span>
              {/* Sleek Progress Indeterminate Line */}
              <div className="w-24 h-[1.5px] bg-gray-200 dark:bg-[var(--color-border)] rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-1/2 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!isAdminPage && <SideNavbar />}
      <main className={!isAdminPage ? 'md:pl-20 transition-all duration-300' : ''}>{children}</main>
    </>
  );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <LayoutContent>{children}</LayoutContent>
    </DataProvider>
  );
}