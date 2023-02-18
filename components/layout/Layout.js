import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Breadcrumb from '@components/systems/Breadcrumb';
import Navbar from './Navbar';
import Menu from './Menu';
import clsx from 'clsx';
import nookies from 'nookies';
import HeadSeo from './HeadSeo';

export default function Layout({ children, title, description, className }) {
  const admin = nookies.get(null, 'name');
  const [mounted, setMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HeadSeo title={title} description={description} />

      <div
        className='font-inter mx-auto min-h-screen w-screen max-w-[100rem] bg-white text-sm dark:bg-neutral-900 lg:grid'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar />

        <div className='relative scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'>
          <Navbar />

          {/* Show on Mobile */}
          <div
            className={clsx(
              'flex items-center justify-between gap-x-4 border-b px-2 py-3 dark:border-neutral-800 sm:px-3 lg:hidden',
              'overflow-x-auto bg-white/95 dark:bg-neutral-900/90',
              'scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={clsx(
              'hidden items-center justify-between gap-x-4 border-b px-2 py-3 dark:border-neutral-800 sm:px-3 lg:flex',
              'sticky top-0 z-40 bg-white/95 supports-[backdrop-filter]:backdrop-blur-sm dark:bg-neutral-900/90'
            )}
          >
            <Breadcrumb />

            {mounted && admin.name ? <Menu /> : null}
          </div>

          <div className={`px-4 py-4 sm:px-5 ${className}`}>{children}</div>
        </div>
      </div>
    </>
  );
}
