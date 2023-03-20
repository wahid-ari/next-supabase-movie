import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Breadcrumb from '@components/systems/Breadcrumb';
import Navbar from './Navbar';
import Menu from './Menu';
import clsx from 'clsx';
import nookies from 'nookies';
import HeadSeo from './HeadSeo';
import { useKmenu } from 'kmenu';
import Button from '@components/systems/Button';

export default function Layout({ children, title, description, className }) {
  const { toggle } = useKmenu();
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
        className='mx-auto min-h-screen w-full max-w-[100rem] bg-white text-sm dark:bg-neutral-900 lg:grid'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar />

        <div className='relative'>
          <Navbar />

          {/* Show on Mobile */}
          <div
            className={clsx(
              'flex items-center justify-between gap-x-4 border-b px-4 py-3 dark:border-neutral-800 lg:hidden',
              'overflow-x-auto bg-white/95 dark:bg-neutral-900/90',
              'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={clsx(
              'hidden h-[45px] items-center justify-between gap-x-4 border-b py-3 px-4 dark:border-neutral-800 lg:flex',
              'sticky top-0 z-40',
              'bg-white/50 dark:bg-neutral-900/30',
              'backdrop-blur-md backdrop-filter'
            )}
          >
            <Breadcrumb />

            <div className='flex gap-4'>
              <Button.secondary
                onClick={toggle}
                className='mr-2 flex items-center gap-2 truncate !bg-transparent !px-1.5 !py-0.5 text-[13px] hover:!bg-neutral-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:!bg-neutral-800/70'
              >
                Command Menu
                <div className='flex items-center gap-0.5'>
                  <kbd className='rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-900 dark:bg-neutral-700 dark:text-neutral-300'>
                    ⌘
                  </kbd>
                  <kbd className='rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-900 dark:bg-neutral-700 dark:text-neutral-300'>
                    K
                  </kbd>
                </div>
              </Button.secondary>
            </div>

            {mounted && admin.name ? <Menu /> : null}
          </div>

          <div className={`py-5 px-5 ${className}`}>{children}</div>
        </div>
      </div>
    </>
  );
}
